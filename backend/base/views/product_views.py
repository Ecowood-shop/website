import jwt

from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import AuthenticationFailed, NotFound, ValidationError
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review, Category, User, Color, Discount
from base.serializers import ProductSerializer, CategorySerializer, TopProductSerializer

from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query is None:
        query = ''

    products = Product.objects.filter(
        name_geo__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page is None:
        page = 1

    page = int(page)
    print('Page:', page)
    print(products)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getTopProducts(request):
    category = Category.objects.all()

    first = Product.objects.filter(category=category[0]).order_by('-createdAt')[0:8]
    second = Product.objects.filter(category=category[1]).order_by('-createdAt')[0:8]
    third = Product.objects.filter(category=category[2]).order_by('-createdAt')[0:8]
    fourth = Product.objects.filter(category=category[3]).order_by('-createdAt')[0:8]
    fifth = Product.objects.filter(category=category[4]).order_by('-createdAt')[0:8]
    sixth = Product.objects.filter(category=category[5]).order_by('-createdAt')[0:8]
    seventh = Product.objects.filter(category=category[6]).order_by('-createdAt')[0:8]
    eighth = Product.objects.filter(category=category[7]).order_by('-createdAt')[0:8]

    serializer = TopProductSerializer(first, many=True)
    serializer2 = TopProductSerializer(second, many=True)
    serializer3 = TopProductSerializer(third, many=True)
    serializer4 = TopProductSerializer(fourth, many=True)
    serializer5 = TopProductSerializer(fifth, many=True)
    serializer6 = TopProductSerializer(sixth, many=True)
    serializer7 = TopProductSerializer(seventh, many=True)
    serializer8 = TopProductSerializer(eighth, many=True)

    return Response({str(category[0]): serializer.data, str(category[1]): serializer2.data,
                     str(category[2]): serializer3.data, str(category[3]): serializer4.data,
                     str(category[4]): serializer5.data, str(category[5]): serializer6.data,
                     str(category[6]): serializer7.data, str(category[7]): serializer8.data})


@api_view(['GET'])
def getLatestProducts(request):
    category = Category.objects.all()

    products = []

    for e in category:
        products += Product.objects.filter(category=e).order_by('-createdAt')[0:8]

    serializer = TopProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createProduct(request):
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

    category = Category.objects.get(name=data['category'])
    color = Color.objects.get(name=data['color'])
    discount = Discount.objects.get(discount_percent=data['discount'])

    product = Product.objects.create(
        user=user,
        name_geo=data['name_geo'],
        name_eng=data['name_eng'],
        name_rus=data['name_rus'],

        brand=data['brand'],
        category=category,
        color=color,
        discount=discount,

        size=data['size'],
        description_geo=data['description_geo'],
        description_eng=data['description_eng'],
        description_rus=data['description_rus'],
        price=data['price'],
        countInStock=data['countInStock'],
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateProduct(request, pk):
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

    product = Product.objects.get(_id=pk)
    category = Category.objects.get(name=data['category'])
    color = Color.objects.get(name=data['color'])
    discount = Discount.objects.get(discount_percent=data['discount'])

    product.name_geo = data['name_geo']
    product.name_eng = data['name_eng']
    product.name_rus = data['name_rus']

    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']

    product.category = category

    product.color = color
    product.discount = discount

    product.size = data['size']

    product.description_geo = data['description_geo']
    product.description_eng = data['description_eng']
    product.description_rus = data['description_rus']

    product.save()

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
def deleteProduct(request, pk):
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
        product = Product.objects.get(_id=pk)
        product.delete()
    except:
        raise NotFound()

    return Response('Product Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')
