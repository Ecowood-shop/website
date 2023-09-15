import time
from datetime import datetime

import jwt
from base.models import Order, OrderItem, ShippingAddress, WithoutShipping, User, Warehouse, AddToCart, \
    Picture, Variants, ShippingPrices, Translation
from base.serializers import ProductSerializer, OrderSerializer, VariantSerializer, WarehouseSerializer, \
    ShippingPricesSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db import transaction
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.response import Response
from base.sendEmail import sendOrderDetails
from django.db.models import F

import threading
import json

from base.payment.JustPay import justPay, transactionInformation
from base.errors.translations import authentication, no_items, out_of_stock, order_not_exist, without_permission, \
    order_with_id_not_exist


def apply_user_discounts(products, user):
    serializer_data = []

    for product in products:
        product.discount = product.get_discount(user)
        serializer_data.append(ProductSerializer(product).data)


@api_view(['POST'])
def addOrderItems(request):
    token = request.COOKIES.get('jwt')

    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()
    data = request.data

    orderItems = AddToCart.objects.filter(user=user)

    if len(orderItems) == 0:
        return no_items(language)
    else:
        discounted_sum_price = 0.0
        for item in orderItems:
            product_discount = item.product.get_discount(user)
            if product_discount:
                discounted_price = float(item.product.price * (1 - (product_discount.percentage / 100)))
                discounted_sum_price += float(item.qty * discounted_price)

            with transaction.atomic():
                # (1) Create Order

                order = Order.objects.create(
                    user=user,
                    paymentMethod=data['paymentMethod'],
                    shippingPrice=data['shippingPrice'],
                    totalPrice=discounted_sum_price,
                    wants_delivery=data['wants_delivery'],
                    physicPerson=data['physicPerson']
                )

                # (2) Create shipping address
                if order.wants_delivery == 'True':
                    city = ShippingPrices.objects.get(_id=data['cityId'])

                    shipping = ShippingAddress.objects.create(
                        order=order,
                        first_name=data['first_name'],
                        last_name=data['last_name'],
                        personId=data['personId'],
                        phone=data['phone'],
                        address=data['address'],
                        city=city
                    )

                    if city.limit <= float(discounted_sum_price):
                        order.shippingPrice = city.upperLimit
                    else:
                        order.shippingPrice = city.lowerLimit
                    order.save()

                else:
                    warehouse = Warehouse.objects.get(location=data['_id'])

                    shipping = WithoutShipping.objects.create(
                        order=order,
                        name=data['first_name'],
                        surname=data['last_name'],
                        personId=data['personId'],
                        phone=data['phone'],
                        warehouse=warehouse
                    )

                # (3) Create order items and set order to orderItem relationship
                for i in orderItems:
                    if not i.product.active:
                        raise Exception

                    variant = Variants.objects.select_for_update().get(id=i.variants_id, active=True)
                    image = Picture.objects.get(product_id=i.product._id, ord=0)
                    item = OrderItem.objects.create(
                        product=i.product,
                        order=order,
                        name=i.product.name_geo,
                        qty=i.qty,
                        price=i.product.price * (1 - (i.product.get_discount(user).percentage / 100)),
                        variant=variant,
                        image=image.picture,
                    )

                    # (4) Update Stock
                    if variant.quantity - item.qty >= 0:
                        variant.previous_quantity = F('quantity')
                        variant.quantity = F('quantity') - item.qty
                        variant.save()

                    else:
                        return out_of_stock(language)

                if language == 'ENG':
                    lan = 'EN'
                elif language == 'GEO':
                    lan = 'KA'
                elif language == 'RUS':
                    lan = 'RU'

                if order.wants_delivery == 'True':
                    payment = justPay(order.totalPrice + float(order.shippingPrice), order._id, lan)
                else:
                    payment = justPay(order.totalPrice, order._id, lan)

                order.transactionId = payment['response']['transactionId']
                order.save()
                AddToCart.objects.filter(user=user).delete()

        serializer = OrderSerializer(order, many=False)

        my_thread = threading.Thread(target=sendOrderDetails,
                                     args=(user, order, orderItems, 'luka.gogiashvili.02@gmail.com'), daemon=True)
        my_thread.start()
        # sendOrderDetails(user, order, orderItems, 'temopkhakadze2002@gmail.com')

        if language is not None and language != '':

            for field in serializer.data['orderItems']:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=field['name'])
                    if translation.value == '':
                        raise Translation.DoesNotExist()
                    field['name'] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

        return Response({'transactionUrl': payment['response']['transactionUrl']})


@api_view(['POST'])
def paymentStatus(request):
    response_dict = json.loads(request.body)

    payment_id = response_dict['PaymentId']
    payment_status = response_dict['PaymentStatus']

    with transaction.atomic():
        try:
            # lock the row until the transaction ends
            order = Order.objects.select_for_update().get(transactionId=payment_id)
        except Order.DoesNotExist:
            return Response({'Error': "Order does not exist"})

        variant = order.variant

        if payment_status == 'Captured':
            variant.previous_quantity = variant.quantity
            variant.save()
            return Response({'Status': "Successful"})

        elif payment_status == 'Rejected':
            variant.quantity = variant.previous_quantity
            variant.save()
            return Response({'Status': "Rejected"})

        return Response({'Payment': payment_status})


@api_view(['GET'])
def check(request):
    info = transactionInformation("03D85F725B844B40BC41BD7C90E55D16")
    return Response({"status": info})


@api_view(['GET'])
def getMyOrders(request):
    token = request.COOKIES.get('jwt')

    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()
    orders = user.order_set.all().order_by('-createdAt')

    page = request.query_params.get('page')

    paginator = Paginator(orders, 10)

    try:
        orders = paginator.page(page)
    except PageNotAnInteger:
        orders = paginator.page(1)
    except EmptyPage:
        orders = paginator.page(paginator.num_pages)

    if page is None or page == "null":
        page = 1

    page = int(page)

    serializer = OrderSerializer(orders, many=True)

    if language is not None and language != '':
        for product in serializer.data:
            for field in product['orderItems']:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=field['name'])
                    if translation.value == '':
                        raise Translation.DoesNotExist()
                    field['name'] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

    return Response({'Orders': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getOrders(request):
    token = request.COOKIES.get('jwt')
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission(language)

    query = request.query_params.get('keyword')
    ordID = request.query_params.get('ordID')
    page = request.query_params.get('page')
    delivered = request.query_params.get('delivered')

    if query is None or query == "null":
        query = ''

    orders = Order.objects.filter(user__first_name__icontains=query) | Order.objects.filter(
        user__last_name__icontains=query).order_by('-createdAt')

    if delivered is None or delivered == "null":
        pass
    else:
        orders = orders.filter(isDelivered__exact=delivered).order_by('-createdAt')

    if ordID is None or ordID == "null":
        pass
    else:
        orders = orders.filter(_id__exact=ordID).order_by('-createdAt')

    paginator = Paginator(orders, 20)

    try:
        orders = paginator.page(page)
    except PageNotAnInteger:
        orders = paginator.page(1)
    except EmptyPage:
        orders = paginator.page(paginator.num_pages)

    if page is None or page == "null":
        page = 1

    page = int(page)

    serializer = OrderSerializer(orders, many=True)
    return Response({'Orders': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getOrderById(request, pk):
    token = request.COOKIES.get('jwt')

    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    try:
        order = Order.objects.get(_id=pk)
    except:
        return order_with_id_not_exist(language)

    orderItems = order.orderitem_set.all()
    variant = []
    products = []

    for e in orderItems:
        variant.append(e.variant)
        products.append(e.product)

    if user.is_staff or order.user == user:
        serializer = OrderSerializer(order, many=False)
        variantSerializer = VariantSerializer(variant, many=True)
        productSerializer = ProductSerializer(products, many=True, fields=('_id', 'size'))

        if language is not None and language != '':

            for field in serializer.data['orderItems']:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=field['name'])
                    if translation.value == '':
                        raise Translation.DoesNotExist()
                    field['name'] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

            for field in variantSerializer.data:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=field['color'])
                    if translation.value == '' or translation.value is None:
                        raise Translation.DoesNotExist()
                    field['color'] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

            for field in productSerializer.data:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=field['size'])
                    if translation.value == '':
                        raise Translation.DoesNotExist()
                    field['size'] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

        return Response({'Order': serializer.data, 'variants': variantSerializer.data, 'size': productSerializer.data})
    else:
        return without_permission(language)


@api_view(['PUT'])
def updateOrderToPaid(request, pk):
    token = request.COOKIES.get('jwt')
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission(language)
    try:
        order = Order.objects.get(_id=pk)
    except:
        return order_with_id_not_exist(language)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    if language == 'GEO':
        return Response({'შეკვეთა გადახდილია'}, status=status.HTTP_200_OK)
    elif language == 'ENG':
        return Response({'Order was paid'}, status=status.HTTP_200_OK)
    elif language == 'RUS':
        return Response({'Заказ оплачен'}, status=status.HTTP_200_OK)
    else:
        return Response({'Order was paid'}, status=status.HTTP_200_OK)


@api_view(['PUT'])
def updateOrderToDelivered(request, pk):
    token = request.COOKIES.get('jwt')
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission(language)

    try:
        order = Order.objects.get(_id=pk)
    except:
        return order_with_id_not_exist(language)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    if language == 'GEO':
        return Response({'შეკვეთა მიტანილია'}, status=status.HTTP_200_OK)
    elif language == 'ENG':
        return Response({'Order was delivered'}, status=status.HTTP_200_OK)
    elif language == 'RUS':
        return Response({'Заказ был доставлен'}, status=status.HTTP_200_OK)
    else:
        return Response({'Order was delivered'}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def deleteOrder(request, pk):
    token = request.COOKIES.get('jwt')
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission

    Order.objects.get(_id=pk).delete()

    if language == 'GEO':
        return Response({'შეკვეთა წაშლილია'}, status=status.HTTP_200_OK)
    elif language == 'ENG':
        return Response({'Order Deleted'}, status=status.HTTP_200_OK)
    elif language == 'RUS':
        return Response({'Заказ удален'}, status=status.HTTP_200_OK)
    else:
        return Response({'Order Deleted'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def getShippingPrices(request):
    language = request.query_params.get('language')

    token = request.COOKIES.get('jwt')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    prices = ShippingPrices.objects.all()
    serializer = ShippingPricesSerializer(prices, many=True)

    if language is not None and language != '':
        for product in serializer.data:
            try:
                # Get the translation for the product's name_geo in the specified language
                translation = Translation.objects.get(language=language, key=product['location'])
                if translation.value == '':
                    raise Translation.DoesNotExist()
                product['location'] = translation.value
            except Translation.DoesNotExist:
                pass  # If no translation is found, keep the original value
    return Response(serializer.data)


@api_view(['GET'])
def getShippingPricesById(request, pk):
    token = request.COOKIES.get('jwt')
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission(language)

    try:
        newDict = {}

        shippingPrices = ShippingPrices.objects.get(_id=pk)

        translation = Translation.objects.filter(key=shippingPrices)
        serializer = ShippingPricesSerializer(shippingPrices, many=False)

        # Get the translation for the product's name_geo in the specified language
        translation_eng = Translation.objects.get(language='ENG', key=shippingPrices)
        translation_rus = Translation.objects.get(language='RUS', key=shippingPrices)

        newDict.update(serializer.data)

        newDict['name_eng'] = translation_eng.value
        newDict['name_rus'] = translation_rus.value

        return Response(newDict)
    except Exception as e:
        raise ValidationError(e)


@api_view(['POST'])
def createShippingPrice(request):
    token = request.COOKIES.get('jwt')
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission(language)

    data = request.data

    if ShippingPrices.objects.filter(location=data['location']).exists():
        raise ValidationError("This location already exist.")
    else:
        with transaction.atomic():

            location = ShippingPrices.objects.create(
                location=data['location'],
                limit=data['limit'],
                upperLimit=data['upperLimit'],
                lowerLimit=data['lowerLimit']
            )

            if not Translation.objects.filter(language='ENG', key=data['location']).exists():
                Translation.objects.create(language='ENG', key=data['location'], value=data['name_eng'])
            if not Translation.objects.filter(language='RUS', key=data['location']).exists():
                Translation.objects.create(language='RUS', key=data['location'], value=data['name_rus'])
    return Response("Location " + data['location'] + " Created Successfully")


@api_view(['DELETE'])
def deleteShippingPrice(request, pk):
    token = request.COOKIES.get('jwt')
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission(language)

    ShippingPrices.objects.get(_id=pk).delete()

    return Response("Location Successfully Deleted")


@api_view(['PUT'])
def updateShippingPrice(request, pk):
    token = request.COOKIES.get('jwt')
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission(language)

    data = request.data

    try:
        shippingPrice = ShippingPrices.objects.get(_id=pk)
        translation_eng = Translation.objects.get(language='ENG', key=shippingPrice.location)
        translation_rus = Translation.objects.get(language='RUS', key=shippingPrice.location)
    except Exception as e:
        raise ValidationError(e)

    with transaction.atomic():
        if data['location'] and data['location'] != shippingPrice.location:
            shippingPrice.location = data['location']

            if not Translation.objects.filter(language='ENG', key=data['location'], value=data['name_eng']).exists():
                Translation.objects.create(language='ENG', key=data['location'], value=data['name_eng'])

            if not Translation.objects.filter(language='RUS', key=data['location'], value=data['name_rus']).exists():
                Translation.objects.create(language='RUS', key=data['location'], value=data['name_rus'])

        else:
            translation_eng.value = data['name_eng']
            translation_rus.value = data['name_rus']

            translation_eng.save()
            translation_rus.save()

        if data['limit']:
            shippingPrice.limit = data['limit']
        if data['upperLimit']:
            shippingPrice.upperLimit = data['upperLimit']
        if data['lowerLimit']:
            shippingPrice.lowerLimit = data['lowerLimit']

    shippingPrice.save()

    serializer = ShippingPricesSerializer(shippingPrice, many=False)

    newDict = {}

    newDict.update(serializer.data)

    newDict['category_eng'] = translation_eng.value
    newDict['category_rus'] = translation_rus.value
    return Response({'Location With Prices': newDict})
