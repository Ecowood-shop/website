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
import threading


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
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()
    data = request.data

    orderItems = AddToCart.objects.filter(user=user)

    if len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        discounted_sum_price = 0.0
        for item in orderItems:
            product_discount = item.product.get_discount(user)
            if product_discount:
                discounted_price = float(item.product.price * (1 - (product_discount.percentage / 100)))
                discounted_sum_price += float(item.qty * discounted_price)

        try:
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
                    warehouse = Warehouse.objects.get(_id=data['_id'])

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

                    variant = Variants.objects.get(id=i.variants_id, active=True)
                    image = Picture.objects.get(product_id=i.product._id, ord=0)

                    item = OrderItem.objects.create(
                        product=i.product,
                        order=order,
                        name=i.product.name_geo,
                        qty=i.qty,
                        price=i.product.price * (1 - (i.product.get_discount(user).percentage / 100)),
                        variant=variant,
                        image=image,
                    )

                    # (4) Update Stock
                    variant.quantity -= item.qty
                    variant.save()

                AddToCart.objects.filter(user=user).delete()

        except Exception as e:
            # log the error or handle it as appropriate
            return Response({'detail': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
                    field['name'] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

        if order.wants_delivery == 'False':
            warehouseSerializer = WarehouseSerializer(warehouse, many=False)
            return Response({'Cart': serializer.data, 'Warehouse': warehouseSerializer.data})
        else:
            return Response({'Cart': serializer.data})


@api_view(['GET'])
def getMyOrders(request):
    token = request.COOKIES.get('jwt')

    language = request.query_params.get('language')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

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
    print('Page:', page)
    print(orders)

    serializer = OrderSerializer(orders, many=True)

    if language is not None and language != '':
        for product in serializer.data:
            for field in product['orderItems']:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=field['name'])
                    field['name'] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

    return Response({'Orders': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getOrders(request):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        raise AuthenticationFailed('You do not have permission to perform this action.')

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
    print('Page:', page)
    print(orders)

    serializer = OrderSerializer(orders, many=True)
    return Response({'Orders': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getOrderById(request, pk):
    token = request.COOKIES.get('jwt')

    language = request.query_params.get('language')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()

    try:
        order = Order.objects.get(_id=pk)
    except:
        raise ValidationError('Order with this ID does not exist')

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
                    field['name'] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

            for field in variantSerializer.data:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=field['color'])
                    field['color'] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

        return Response({'Order': serializer.data, 'variants': variantSerializer.data, 'size': productSerializer.data})
    else:
        Response({'detail': 'Not authorized to view this order'},
                 status=status.HTTP_400_BAD_REQUEST)
    return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateOrderToPaid(request, pk):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        raise AuthenticationFailed('You do not have permission to perform this action.')

    try:
        order = Order.objects.get(_id=pk)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')


@api_view(['PUT'])
def updateOrderToDelivered(request, pk):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        raise AuthenticationFailed('You do not have permission to perform this action.')

    try:
        order = Order.objects.get(_id=pk)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')


@api_view(['DELETE'])
def deleteOrder(request, pk):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        raise AuthenticationFailed('You do not have permission to perform this action.')

    Order.objects.get(_id=pk).delete()

    return Response("Order Deleted")


@api_view(['GET'])
def getShippingPrices(request):
    language = request.query_params.get('language')

    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    prices = ShippingPrices.objects.all()
    serializer = ShippingPricesSerializer(prices, many=True)

    if language is not None and language != '':
        for product in serializer.data:
            try:
                # Get the translation for the product's name_geo in the specified language
                translation = Translation.objects.get(language=language, key=product['location'])
                product['location'] = translation.value
            except Translation.DoesNotExist:
                pass  # If no translation is found, keep the original value
    return Response(serializer.data)


@api_view(['POST'])
def createShippingPrice(request):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        raise AuthenticationFailed('You do not have permission to perform this action.')

    data = request.data

    if ShippingPrices.objects.filter(location=data['location']).exists():
        raise ValidationError("This location already exist.")
    else:
        location = ShippingPrices.objects.create(
            location=data['location'],
            limit=data['limit'],
            upperLimit=data['upperLimit'],
            lowerLimit=data['lowerLimit']
        )

    return Response("Location " + data['location'] + " Created Successfully")


@api_view(['DELETE'])
def deleteShippingPrice(request, pk):
    ShippingPrices.objects.get(_id=pk).delete()

    return Response("Location Successfully Deleted")


@api_view(['PUT'])
def updateShippingPrice(request, pk):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        raise AuthenticationFailed('You do not have permission to perform this action.')

    data = request.data

    shippingPrice = ShippingPrices.objects.get(_id=pk)

    if data['location']:
        shippingPrice.location = data['location']

    if data['limit']:
        shippingPrice.limit = data['limit']
    if data['upperLimit']:
        shippingPrice.upperLimit = data['upperLimit']
    if data['lowerLimit']:
        shippingPrice.lowerLimit = data['lowerLimit']

    shippingPrice.save()

    serializer = ShippingPricesSerializer(shippingPrice, many=False)

    return Response({'Location With Prices': serializer.data})
