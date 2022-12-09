import jwt

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress, WithoutShipping, User, Warehouse, AddToCart, \
    Picture, Variants
from base.serializers import ProductSerializer, OrderSerializer, VariantSerializer

from rest_framework import status
from datetime import date, datetime

from rest_framework.exceptions import AuthenticationFailed, NotFound, ValidationError


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
            shipping = ShippingAddress.objects.create(
                order=order,
                first_name=data['first_name'],
                last_name=data['last_name'],
                personId=data['personId'],
                phone=data['phone'],
                address=data['address']
            )
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
            product = Variants.objects.get(product_id=i.product._id, color=i.variants.color)
            image = Picture.objects.get(product_id=i.product._id, ord=0)

            item = OrderItem.objects.create(
                product=i.product,
                order=order,
                name=i.product.name_geo,
                qty=i.qty,
                price=i.product.price,
                image=image,
            )

            variants = Variants.objects.filter(product_id=i.product._id, color=i.variants.color)
            data.append(VariantSerializer(variants, many=True).data)
            # (4) Update Stock

            if product.quantity - item.qty < 0:
                return Response({'detail ': product.product.name_geo + ' Product Out of stock'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                product.quantity -= item.qty
                product.save()

        serializer = OrderSerializer(order, many=False)

        return Response({'Order': serializer.data, 'variants': data})


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
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


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

    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


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

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
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
