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

    category = request.query_params.get('category')
    if category == 'null':
        category = ''

    products = products.filter(category__icontains=category)

    order = request.query_params.get('order')
    if order == 'ascending':
        products = products.order_by('price')
    elif order == 'descending':
        products = products.order_by('-price')

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
def getLatestProducts(request):
    category = Category.objects.all()

    products = []

    for e in category:
        products += Product.objects.filter(category=e).order_by('-createdAt')[0:8]

    serializer = TopProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getLatestProduct(request, pk):
    category = Category.objects.get(name=pk)

    products = []

    products += Product.objects.filter(category=category).order_by('-createdAt')[0:8]

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
