from datetime import datetime

import jwt
from base.models import Order, OrderItem, ShippingAddress, WithoutShipping, User, Warehouse, AddToCart, \
    Picture, Variants, ShippingPrices
from base.serializers import ProductSerializer, OrderSerializer, VariantSerializer, WarehouseSerializer, \
    ShippingPricesSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.response import Response


@api_view(['POST'])
def addOrderItems(request):
    token = request.COOKIES.get('jwt')

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

        products = []
        variants = []
        totalQuantity = 0
        sum_price = 0
        discounted_sum_price = 0

        for i in orderItems:
            products.append(i.product)
            variants.append(i.variants)

            totalQuantity += i.qty

            sum_price += i.qty * (float(i.product.price))
            discounted_sum_price += i.qty * (
                    float(i.product.price) - float(i.product.price) * float(i.product.discount.discount_percent) / 100)

        sum_price = '%.2f' % sum_price
        discounted_sum_price = '%.2f' % discounted_sum_price

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
        data = []

        for i in orderItems:
            print(i.product)
            variant = Variants.objects.get(id=i.variants_id)
            image = Picture.objects.get(product_id=i.product._id, ord=0)

            item = OrderItem.objects.create(
                product=i.product,
                order=order,
                name=i.product.name_geo,
                qty=i.qty,
                price=i.product.price,
                variant=variant,
                image=image,
            )

            # (4) Update Stock

            variant.quantity -= item.qty
            variant.save()

        AddToCart.objects.filter(user=user).delete()

        serializer = OrderSerializer(order, many=False)

        if order.wants_delivery == 'False':
            warehouseSerializer = WarehouseSerializer(warehouse, many=False)
            return Response({'Cart': serializer.data, 'Warehouse': warehouseSerializer.data})
        else:
            return Response({'Cart': serializer.data})


@api_view(['GET'])
def getMyOrders(request):
    token = request.COOKIES.get('jwt')

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

    # orders = Order.objects.all().order_by('-createdAt')

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

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()

    order = Order.objects.get(_id=pk)
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
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    prices = ShippingPrices.objects.all()
    serializer = ShippingPricesSerializer(prices, many=True)

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
