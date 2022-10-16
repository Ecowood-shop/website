import jwt
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import AuthenticationFailed, NotFound, ValidationError
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Category, User, Color, Discount, Variants, AddToCart, Picture
from base.serializers import ProductSerializer, CategorySerializer, TopProductSerializer, \
    VariantSerializer, ColorSerializer, AddToCartSerializer, UserSerializer, SpecificProductSerializer


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')

    if query is None or query == "null":
        query = ''

    products = Product.objects.filter(
        name_geo__icontains=query).order_by('-createdAt')

    category = request.query_params.get('category')

    if category is None or category == "null":
        category = ''
        products = products.filter(category__name__icontains=category)
    else:
        products = products.filter(category__name__exact=category)

    order = request.query_params.get('order')

    if order == '1':
        products = products.order_by('price')
    elif order == '-1':
        products = products.order_by('-price')

    page = request.query_params.get('page')
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page is None or page == "null":
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
    try:
        product = Product.objects.get(_id=pk)
    except:
        raise ValidationError('Product with this ID does now exist')

    variants = Variants.objects.filter(product_id=pk)

    serializer = ProductSerializer(product, many=False)
    variantSerializer = VariantSerializer(variants, many=True)
    return Response({'products': serializer.data, 'variants': variantSerializer.data})


@api_view(['GET'])
def getProductVariants(request, pk):
    try:
        product = Product.objects.get(_id=pk)
    except:
        raise ValidationError('Product with this ID does now exist')

    variants = Variants.objects.filter(product_id=pk)

    variantSerializer = VariantSerializer(variants, many=True)
    return Response(variantSerializer.data)


@api_view(['GET'])
def getProductColors(request):
    try:
        colors = Color.objects.all()
    except:
        raise ValidationError('There is no color yet')

    colorSerializer = ColorSerializer(colors, many=True)
    return Response(colorSerializer.data)


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

    try:
        category = Category.objects.get(name=data['category'])
    except:
        raise ValidationError('Category does not exist')

    try:
        discount = Discount.objects.get(discount_percent=data['discount'])
    except:
        raise ValidationError('Such kind of discount does not exist')

    product = Product.objects.create(
        user=user,
        name_geo=data['name_geo'],
        brand=data['brand'],
        category=category,
        size=data['size'],
        technicalRequirements=data['technicalRequirements'],
        instructionForUse=data['instructionForUse'],
        safetyStandard=data['safetyStandard'],
        youtubeUrl=data['youtubeUrl'],
        price=data['price'],
        discount=discount,
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createCategory(request):
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

    if Category.objects.filter(name=data['name']).exists():
        raise ValidationError("This category already exist.")
    else:
        category = Category.objects.create(
            name=data['name']
        )

    return Response("Category " + data['name'] + " Created Successfully")


@api_view(['POST'])
def createVariants(request):
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

    color = Color.objects.get(name=data['color'])
    product = Product.objects.get(_id=data['productID'])

    possibleVariants = Variants.objects.filter(product_id=data['productID'])

    if possibleVariants.filter(title=data['variantTitle']).exists():
        raise ValidationError("Product's variant with this title already exist")

    variants = Variants.objects.create(
        product=product,
        title=data['variantTitle'],
        color=color,
        quantity=data['quantity']
    )

    serializer = VariantSerializer(variants, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def addToCart(request, pk):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    product = Product.objects.get(_id=pk)

    user = User.objects.filter(id=payload['id']).first()

    data = request.data

    variants = Variants.objects.get(id=data['variantID'])

    if AddToCart.objects.filter(user=user, product_id=product._id, variants=variants.id).exists():
        return Response("This product is already in Cart")

    cart = AddToCart.objects.create(user=user, product=product, variants=variants, qty=data['qty'])

    cart.save()

    return Response("Product Added")


@api_view(['PUT'])
def updateCart(request, pk):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()

    data = request.data

    try:
        carts = AddToCart.objects.get(id=pk)
    except:
        raise ValidationError('Variant with this id does not exist')

    carts.qty = data['qty']

    carts.save()

    addToCartSerializer = AddToCartSerializer(carts, many=False)

    return Response(addToCartSerializer.data)


@api_view(['GET'])
def getUserCart(request):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()

    carts = AddToCart.objects.filter(user=user)

    products = []
    variants = []
    # qty = []
    sum_price = 0
    discounted_sum_price = 0

    for i in carts:
        products.append(i.product)
        variants.append(i.variants)
        sum_price += i.qty * (int(i.product.price))
        discounted_sum_price += i.qty * (
                    int(i.product.price) - int(i.product.price) * int(i.product.discount.discount_percent) / 100)

    serializer = AddToCartSerializer(carts, many=True)
    productSerializer = SpecificProductSerializer(products, many=True)
    variantSerializer = VariantSerializer(variants, many=True)
    data = {
        'carts': serializer.data,
        'products': productSerializer.data,
        'variants': variantSerializer.data,
        # 'qty': qty,
        'sum_price': sum_price,
        'discounted_sum_price': discounted_sum_price
    }

    return Response(data)


@api_view(['DELETE'])
def deleteCart(request, pk):
    AddToCart.objects.get(id=pk).delete()

    return Response("Product Deleted")


@api_view(['PUT'])
def updateVariant(request, pk):
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

    try:
        variant = Variants.objects.get(id=pk)
    except:
        raise ValidationError('Variant with this id does not exist')

    color = Color.objects.get(name=data['color'])

    variant.title = data['title']
    variant.color = color
    variant.quantity = data['quantity']

    variant.save()

    variantSerializer = VariantSerializer(variant, many=False)

    return Response(variantSerializer.data)


@api_view(['DELETE'])
def deleteVariant(request, pk):
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
        variant = Variants.objects.get(id=pk)
        variant.delete()
    except:
        raise NotFound()

    return Response('Variant Deleted')


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

    try:
        category = Category.objects.get(name=data['category'])
    except:
        raise ValidationError('Category does not exist')

    try:
        discount = Discount.objects.get(discount_percent=data['discount'])
    except:
        raise ValidationError('Such kind of discount does not exist')

    product.name_geo = data['name_geo']
    product.price = data['price']
    product.brand = data['brand']
    product.category = category
    product.discount = discount
    product.size = data['size']
    product.technicalRequirements = data['technicalRequirements']
    product.instructionForUse = data['instructionForUse']
    product.safetyStandard = data['safetyStandard']
    product.youtubeUrl = data['youtubeUrl']

    product.save()

    serializer = ProductSerializer(product, many=False)

    return Response({'products': serializer.data})


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

    try:
        product = Product.objects.get(_id=product_id)
    except:
        raise ValidationError('Products with this id does not exist')

    Picture.product = product
    Picture.picture = request.FILES.get('picture')
    Picture.save()

    return Response('Image was uploaded')


@api_view(['DELETE'])
def deleteImage(request, pk):
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
        picture = Picture.objects.get(id=pk)
        picture.delete()
    except:
        raise NotFound()

    return Response('Image Deleted')
