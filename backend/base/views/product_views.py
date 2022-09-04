from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review, Category
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
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name="Sample Name",
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()

    return Response('Product Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists

    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - Nor Rating or 0

    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')
