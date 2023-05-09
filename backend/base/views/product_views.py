import jwt
from base.models import Product, Category, User, Color, Discount, Variants, AddToCart, Picture, Warehouse, \
    SpecificDiscount, Translation
from base.serializers import ProductSerializer, CategorySerializer, TopProductSerializer, \
    VariantSerializer, ColorSerializer, AddToCartSerializer, SpecificProductSerializer, \
    ProductImageSerializer, WarehouseSerializer, SpecificDiscountSerializer, DiscountSerializer, JustProductsSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db import transaction
from django.db.models import F
from django.db.models import Prefetch, Sum, FloatField, IntegerField, When, Case
from django.db.models import Q
from django.db.models.functions import Coalesce
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed, NotFound, ValidationError
from rest_framework.response import Response


def apply_user_discounts(products, user):
    serializer_data = []

    for product in products:
        product.discount = product.get_discount(user)
        serializer_data.append(ProductSerializer(product).data)


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    language = request.query_params.get('language')
    category = request.query_params.get('category')

    if query is None or query == "null":
        query = ''

    if category is None or category == "null":
        category = ''

    if language is None or language == "null" or language == '':
        translated_name = Translation.objects.filter(language='ENG',
                                                     value__icontains=query) | Translation.objects.filter(
            language='RUS', value__icontains=query)
        translated_category = Translation.objects.filter(language='ENG',
                                                         value__exact=category) | Translation.objects.filter(
            language='RUS', value__exact=category)
    else:
        translated_name = Translation.objects.filter(language=language, value__icontains=query)
        translated_category = Translation.objects.filter(language=language, value__exact=category)

    translated_name_keys = [t.key for t in translated_name]
    translated_category_keys = [t.key for t in translated_category]

    if query != '':
        products = Product.objects.filter(name_geo__in=translated_name_keys, active=True).order_by(
            '-createdAt') | Product.objects.filter(name_geo__icontains=query, active=True).order_by('-createdAt')
    else:
        products = Product.objects.filter(name_geo__icontains=query, active=True).order_by('-createdAt')
    category = request.query_params.get('category')

    if category is None or category == "null":
        category = ''
        products = products.filter(category__name__icontains=category)
    else:
        products = products.filter(category__name__in=translated_category_keys) | products.filter(
            category__name__exact=category)

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

    # Get user-specific discounts and apply them if they are greater than the general discount
    try:
        token = request.COOKIES.get('jwt')
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        user = User.objects.filter(id=payload['id']).first()
    except:
        serializer = ProductSerializer(products, many=True)
        if language is not None and language != '':
            for product in serializer.data:
                for field_name in ['name_geo', 'brand', 'category', 'size', 'technicalRequirements',
                                   'instructionForUse', 'safetyStandard', 'coverageLength', 'youtubeUrl', 'price',
                                   'discount']:
                    try:
                        # Get the translation for the product's name_geo in the specified language
                        translation = Translation.objects.get(language=language, key=product[field_name])
                        product[field_name] = translation.value
                    except Translation.DoesNotExist:
                        pass  # If no translation is found, keep the original value
        return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

    apply_user_discounts(products, user)

    serializer = ProductSerializer(products, many=True)
    # Update the queryset with translated values if language is provided
    if language is not None and language != '':
        for product in serializer.data:
            for field_name in ['name_geo', 'brand', 'category', 'size', 'technicalRequirements', 'instructionForUse',
                               'safetyStandard', 'coverageLength', 'youtubeUrl', 'price', 'discount']:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=product[field_name])
                    product[field_name] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getCategories(request):
    language = request.query_params.get('language')

    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)

    if language is not None and language != '':
        for product in serializer.data:
            try:
                # Get the translation for the product's name_geo in the specified language
                translation = Translation.objects.get(language=language, key=product['name'])
                product['name'] = translation.value
            except Translation.DoesNotExist:
                pass  # If no translation is found, keep the original value
    return Response(serializer.data)


@api_view(['GET'])
def getLatestProducts(request):
    language = request.query_params.get('language')

    category = Category.objects.all()

    products = []

    for e in category:
        products += Product.objects.filter(category=e, active=True).order_by('-createdAt')[0:8]

    # Get user-specific discounts and apply them if they are greater than the general discount
    try:
        token = request.COOKIES.get('jwt')
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        user = User.objects.filter(id=payload['id']).first()
    except:
        serializer = TopProductSerializer(products, many=True)
        return Response(serializer.data)

    apply_user_discounts(products, user)

    serializer = TopProductSerializer(products, many=True)

    if language is not None and language != '':
        for product in serializer.data:
            for field_name in ['name_geo', 'category', 'size', 'price', 'discount']:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=product[field_name])
                    product[field_name] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value
    return Response(serializer.data)


@api_view(['GET'])
def getLatestProduct(request, pk):
    language = request.query_params.get('language')

    try:
        category = Category.objects.get(name=pk)
    except:
        raise ValidationError('Category with this name does not exist')
    products = []

    products += Product.objects.filter(category=category, active=True).order_by('-createdAt')[0:8]

    # Get user-specific discounts and apply them if they are greater than the general discount
    try:
        token = request.COOKIES.get('jwt')
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        user = User.objects.filter(id=payload['id']).first()
    except:
        serializer = TopProductSerializer(products, many=True)
        return Response(serializer.data)

    apply_user_discounts(products, user)

    serializer = TopProductSerializer(products, many=True)

    if language is not None and language != '':
        for product in serializer.data:
            for field_name in ['name_geo', 'category', 'size', 'price', 'discount']:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=product[field_name])
                    product[field_name] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    language = request.query_params.get('language')

    try:
        product = Product.objects.get(_id=pk, active=True)
    except:
        raise ValidationError('Product with this ID does now exist')

    variants = Variants.objects.filter(product_id=pk, active=True)

    # Get user-specific discounts and apply them if they are greater than the general discount
    try:
        token = request.COOKIES.get('jwt')
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        user = User.objects.filter(id=payload['id']).first()
    except:
        serializer = ProductSerializer(product, many=False)
        variantSerializer = VariantSerializer(variants, many=True)
        return Response({'products': serializer.data, 'variants': variantSerializer.data})

    serializer_data = []

    product.discount = product.get_discount(user)
    serializer_data.append(ProductSerializer(product).data)

    serializer = ProductSerializer(product, many=False)

    if language is not None and language != '':
        for product in serializer_data:
            for field_name in ['name_geo', 'brand', 'category', 'size', 'technicalRequirements', 'instructionForUse',
                               'safetyStandard', 'coverageLength', 'youtubeUrl', 'price', 'discount']:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=product[field_name])
                    product[field_name] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

    variantSerializer = VariantSerializer(variants, many=True)

    if language is not None and language != '':
        for product in variantSerializer.data:
            for field_name in ['color', 'title']:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=product[field_name])
                    product[field_name] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

    return Response({'products': serializer_data, 'variants': variantSerializer.data})


@api_view(['GET'])
def getJustProducts(request):
    language = request.query_params.get('language')

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
        products = Product.objects.filter(active=True)
    except:
        raise ValidationError('There is no Product yet')

    productSerializer = JustProductsSerializer(products, many=True)

    if language is not None and language != '':
        for product in productSerializer.data:
            try:
                # Get the translation for the product's name_geo in the specified language
                translation = Translation.objects.get(language=language, key=product['name_geo'])
                product['name_geo'] = translation.value
            except Translation.DoesNotExist:
                pass  # If no translation is found, keep the original value
    return Response(productSerializer.data)


@api_view(['GET'])
def getProductVariants(request, pk):
    language = request.query_params.get('language')

    variants = Variants.objects.filter(product_id=pk, active=True)

    if len(variants) == 0:
        raise ValidationError('Product with this ID does not have any variant')

    variantSerializer = VariantSerializer(variants, many=True)

    if language is not None and language != '':
        for product in variantSerializer.data:
            for field_name in ['color', 'title']:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=product[field_name])
                    product[field_name] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value
    return Response(variantSerializer.data)


@api_view(['GET'])
def getProductColors(request):
    language = request.query_params.get('language')

    try:
        colors = Color.objects.all()
    except:
        raise ValidationError('There is no color yet')

    serializer = ColorSerializer(colors, many=True)

    if language is not None and language != '':
        for product in serializer.data:
            try:
                # Get the translation for the product's name_geo in the specified language
                translation = Translation.objects.get(language=language, key=product['name'])
                product['name'] = translation.value
            except Translation.DoesNotExist:
                pass  # If no translation is found, keep the original value

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

    try:
        category = Category.objects.get(_id=data['category'])
    except:
        raise ValidationError('Category does not exist')

    discount_type = int(data.get('discountType', 0))
    discount_percent = float(data.get('discountPercent', 0))
    start_date = data.get('start_date')
    end_date = data.get('end_date')

    # Check discount type and set discount object accordingly
    discount = 0
    if discount_type == 0:
        discount, _ = Discount.objects.get_or_create(percentage=0, defaults={'name': '0% discount'})
    elif discount_type == 1:
        try:
            discount = Discount.objects.create(name=f"{discount_percent}% discount", percentage=discount_percent,
                                               start_date=start_date, end_date=end_date)
        except Discount.DoesNotExist:
            ValidationError('There was error during creation process of discount')
    else:
        raise ValidationError('Invalid discount type')

    product = Product.objects.create(
        user=user,
        name_geo=data['name_geo'],
        brand=data['brand_geo'],
        category=category,
        size=data['size_geo'],
        coverageLength=data['coverageLength'],
        technicalRequirements=data['technicalRequirements_geo'],
        instructionForUse=data['instructionForUse_geo'],
        safetyStandard=data['safetyStandard_geo'],
        youtubeUrl=data['youtubeUrl'],
        price=data['price'],
        discount=discount,
    )

    fields = ['name_geo', 'brand_geo', 'category_name_geo', 'size_geo', 'technicalRequirements_geo',
              'instructionForUse_geo', 'safetyStandard_geo']

    for field in fields:
        if field == 'category_name_geo':
            key = category.name
        else:
            if data[field].isdigit():
                continue

            key = data[field]
        if not Translation.objects.filter(key=key).exists():
            eng = field[:-3] + 'eng'
            rus = field[:-3] + 'rus'

            Translation.objects.bulk_create(
                [Translation(language='ENG', key=key, value=data[eng]),
                 Translation(language='RUS', key=key, value=data[rus])])
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

    if not Translation.objects.filter(key=data['name']).exists():
        Translation.objects.bulk_create(
            [Translation(language='ENG', key=data['name']), Translation(language='RUS', key=data['name'])])

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
    product = Product.objects.get(_id=data['productID'], active=True)
    possibleVariants = Variants.objects.filter(product_id=data['productID'], active=True)

    if possibleVariants.filter(title=data['variantTitle']).exists():
        raise ValidationError("Product's variant with this title already exist")

    variants = Variants.objects.create(
        product=product,
        title=data['variantTitle'],
        color=color,
        quantity=data['quantity']
    )

    fields = ['variantTitle', 'color']

    for field in fields:
        if field == 'color':
            key = color.name
        else:
            key = data[field]
        if not Translation.objects.filter(key=key).exists():
            Translation.objects.bulk_create(
                [Translation(language='ENG', key=key), Translation(language='RUS', key=key)])

    serializer = VariantSerializer(variants, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getDiscounts(request):
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
        discount = Discount.objects.filter(active=True, start_date__lte=timezone.now(), end_date__gte=timezone.now())
    except:
        raise ValidationError('There is no discount yet')

    discountSerializer = DiscountSerializer(discount, many=True)
    return Response(discountSerializer.data)


@api_view(['POST'])
def createDiscount(request):
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
        discount = Discount.objects.create(
            name=data.get('name'),
            percentage=data.get('discount_percent'),
            start_date=data.get('start_date'),
            end_date=data.get('end_date'),
        )

        if not Translation.objects.filter(key=data['name']).exists():
            Translation.objects.bulk_create(
                [Translation(language='ENG', key=data['name']), Translation(language='RUS', key=data['name'])])

        return Response("Discount Created")
    except:
        raise ValidationError('Something failed during creation process')


@api_view(['GET'])
def getSpecificDiscounts(request):
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

    if query is None or query == "null":
        query = ''

    specificDiscounts = SpecificDiscount.objects.filter(
        Q(user__first_name__icontains=query) | Q(user__last_name__icontains=query) | Q(
            user__email__icontains=query) | Q(product__name_geo__icontains=query), active=True,
        percentage__end_date__gte=timezone.now()
    )

    page = request.query_params.get('page')
    paginator = Paginator(specificDiscounts, 10)

    try:
        specificDiscounts = paginator.page(page)
    except PageNotAnInteger:
        specificDiscounts = paginator.page(1)
    except EmptyPage:
        specificDiscounts = paginator.page(paginator.num_pages)

    if page is None or page == "null":
        page = 1

    page = int(page)
    print('Page:', page)
    print(specificDiscounts)

    specificDiscounts = SpecificDiscountSerializer(specificDiscounts, many=True)
    return Response({'Specific Discounts': specificDiscounts.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getSpecificDiscount(request, pk):
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
        specificDiscount = SpecificDiscount.objects.get(id=pk)
    except:
        raise NotFound()

    serializer = SpecificDiscountSerializer(specificDiscount, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createSpecificDiscount(request):
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
        with transaction.atomic():
            user_id = data.get('userId')
            product_id = data.get('productId')
            discount_percent = float(data.get('discountPercent', 0))
            start_date = data.get('start_date')
            end_date = data.get('end_date')
            user = User.objects.get(id=user_id)
            product = Product.objects.get(_id=product_id)

            exists = SpecificDiscount.objects.filter(user=user, product=product, active=True,
                                                     percentage__end_date__gte=timezone.now()).exists()

            if exists:
                raise Exception('Specific discount for this user on this product already exists')

            discount = Discount.objects.create(name=f"{discount_percent}% discount", percentage=discount_percent,
                                               start_date=start_date, end_date=end_date)

            SpecificDiscount.objects.create(user=user, product=product, percentage=discount)

            if not Translation.objects.filter(key=f"{discount_percent}% discount").exists():
                Translation.objects.bulk_create(
                    [Translation(language='ENG', key=f"{discount_percent}% discount"),
                     Translation(language='RUS', key=f"{discount_percent}% discount")])

            return Response("Discount Created")
    except Exception as e:
        raise ValidationError(e)


@api_view(['GET'])
def getProductAdmin(request, pk):
    try:
        product = Product.objects.get(_id=pk, active=True)
    except:
        raise ValidationError('Product with this ID does now exist')

    variants = Variants.objects.filter(product_id=pk, active=True)

    # Get user-specific discounts and apply them if they are greater than the general discount
    try:
        token = request.COOKIES.get('jwt')
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        user = User.objects.filter(id=payload['id']).first()
    except:
        serializer = ProductSerializer(product, many=False)
        variantSerializer = VariantSerializer(variants, many=True)
        return Response({'products': serializer.data, 'variants': variantSerializer.data})

    serializer_data = []

    if user.is_staff:
        pass
    else:
        product.discount = product.get_discount(user)
        serializer_data.append(ProductSerializer(product).data)

    serializer = ProductSerializer(product, many=False)
    variantSerializer = VariantSerializer(variants, many=True)
    return Response({'products': serializer.data, 'variants': variantSerializer.data})


@api_view(['PUT'])
def updateSpecificDiscount(request, pk):
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
        with transaction.atomic():
            user_id = data.get('userId')
            product_id = data.get('productId')
            discount_percent = float(data.get('discountPercent', 0))
            start_date = data.get('start_date')
            end_date = data.get('end_date')
            user = User.objects.get(id=user_id)
            product = Product.objects.get(_id=product_id)
            specificDiscount = SpecificDiscount.objects.get(id=pk)

    except Exception as e:
        raise ValidationError(e)

    if user:
        specificDiscount.user = user
    if product:
        specificDiscount.product = product
    if discount_percent:
        specificDiscount.percentage.name = f"{discount_percent}% discount"
        specificDiscount.percentage.percentage = discount_percent
    if start_date:
        specificDiscount.percentage.start_date = start_date
    if end_date:
        specificDiscount.percentage.end_date = end_date
    specificDiscount.percentage.save()
    specificDiscount.save()

    serializer = SpecificDiscountSerializer(specificDiscount, many=False)

    return Response({'products': serializer.data})


@api_view(['POST'])
def addToCart(request, pk):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    product = Product.objects.get(_id=pk, active=True)

    user = User.objects.filter(id=payload['id']).first()

    data = request.data

    variants = Variants.objects.get(id=data['variantID'], active=True)

    if AddToCart.objects.filter(user=user, product_id=product._id, variants=variants.id).exists():
        raise ValidationError("This product is already in Cart")

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
    language = request.query_params.get('language')

    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()

    cart = AddToCart.objects.filter(user=user).select_related('product__discount').prefetch_related(
        Prefetch('product', queryset=Product.objects.select_related('discount')),
        Prefetch('variants', queryset=Variants.objects.all()),
    )

    cart_aggregate = cart.aggregate(
        total_quantity=Coalesce(Sum('qty', output_field=IntegerField()), 0),
        sum_price=Coalesce(Sum(F('qty') * F('product__price'), output_field=FloatField()), 0.0),
    )

    # Calculate discounted_sum_price
    discounted_sum_price = 0.0
    for item in cart:
        product_discount = item.product.get_discount(user)
        if product_discount:
            discounted_price = float(item.product.price * (1 - (product_discount.percentage / 100)))
            discounted_sum_price += float(item.qty * discounted_price)

    cart_aggregate['discounted_sum_price'] = discounted_sum_price

    cart_serializer = AddToCartSerializer(cart, many=True)
    product_ids = cart.values_list('product', flat=True)
    cases = [When(_id=prod_id, then=pos) for pos, prod_id in enumerate(product_ids)]
    products = Product.objects.filter(_id__in=product_ids).select_related('discount').order_by(Case(*cases))

    variant_ids = cart.values_list('variants', flat=True)
    variants = Variants.objects.filter(id__in=variant_ids).select_related('product__discount')

    productSerializer = SpecificProductSerializer(products, many=True)

    if language is not None and language != '':
        for product in productSerializer.data:
            for field_name in ['name_geo', 'size', 'price', 'discount']:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=product[field_name])
                    product[field_name] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

    variantSerializer = VariantSerializer(variants, many=True)

    if language is not None and language != '':
        for product in variantSerializer.data:
            for field_name in ['color', 'title']:
                try:
                    # Get the translation for the product's name_geo in the specified language
                    translation = Translation.objects.get(language=language, key=product[field_name])
                    product[field_name] = translation.value
                except Translation.DoesNotExist:
                    pass  # If no translation is found, keep the original value

    try:
        apply_user_discounts(products, user)
    except:
        pass

    data = {
        'carts': cart_serializer.data,
        'products': productSerializer.data,
        'variants': variantSerializer.data,
        'qty': cart_aggregate['total_quantity'],
        'sum_price': '%.2f' % cart_aggregate['sum_price'],
        'discounted_sum_price': '%.2f' % cart_aggregate['discounted_sum_price'],
    }

    return Response(data)


@api_view(['DELETE'])
def deleteCart(request, pk):
    AddToCart.objects.get(id=pk).delete()

    return Response("Product Deleted")


@api_view(['DELETE'])
def deleteCategory(request, pk):
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

    Category.objects.get(_id=pk).delete()

    return Response("Category Deleted")


@api_view(['DELETE'])
def deleteDiscount(request, pk):
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
        Discount.objects.get(id=pk).delete()
    except:
        raise ValidationError('Discount with this ID does not exist')
    return Response("Discount Deleted")


@api_view(['DELETE'])
def deleteSpecificDiscount(request, pk):
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
        SpecificDiscount.objects.get(id=pk).delete()
    except:
        raise ValidationError('Specific Discount with this ID does not exist')
    return Response("Specific Discount Deleted")


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
        variant = Variants.objects.get(id=pk, active=True)
    except:
        raise ValidationError('Variant with this id does not exist')

    color = Color.objects.get(name=data['color'])

    if data['title']:
        variant.title = data['title']

    if color:
        variant.color = color

    if data['quantity']:
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
        variant = Variants.objects.get(id=pk, active=True)
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
    product = Product.objects.get(_id=pk, active=True)

    try:
        category = Category.objects.get(_id=data['category'])
    except:
        raise ValidationError('Category does not exist')

    discount_type = int(data.get('discountType', 0))
    discount_percent = float(data.get('discountPercent', 0))
    start_date = data.get('start_date')
    end_date = data.get('end_date')

    # Check discount type and set discount object accordingly
    if discount_type == 0:
        product.discount, _ = Discount.objects.get_or_create(percentage=0, defaults={'name': '0% discount'})
        # discount
    elif discount_type == 1 and product.discount.percentage != 0:
        product.discount.name = f"{discount_percent}% discount"
        product.discount.percentage = discount_percent
        product.discount.start_date = start_date
        product.discount.end_date = end_date
    elif discount_type == 1 and product.discount.percentage == 0:
        try:
            discount = Discount.objects.create(name=f"{discount_percent}% discount", percentage=discount_percent,
                                               start_date=start_date, end_date=end_date)
            product.discount = discount
        except Discount.DoesNotExist:
            ValidationError('There was error during creation process of discount')
    else:
        raise ValidationError('Invalid discount type')

    if data['name_geo']:
        product.name_geo = data['name_geo']
    if data['price']:
        product.price = data['price']
    if data['brand_geo']:
        product.brand = data['brand_geo']
    if category:
        product.category = category
    if data['size_geo']:
        product.size = data['size_geo']
    if data['technicalRequirements_geo']:
        product.technicalRequirements = data['technicalRequirements_geo']
    if data['instructionForUse_geo']:
        product.instructionForUse = data['instructionForUse_geo']
    if data['safetyStandard_geo']:
        product.safetyStandard = data['safetyStandard_geo']
    if data['youtubeUrl']:
        product.youtubeUrl = data['youtubeUrl']
    if data['coverageLength']:
        product.coverageLength = data['coverageLength']

    fields = ['name_geo', 'brand_geo', 'category', 'size_geo', 'technicalRequirements_geo',
              'instructionForUse_geo', 'safetyStandard_geo']

    for field in fields:
        if data[field].isdigit():
            continue

        key = data[field]

        eng = field[:-3] + 'eng'
        rus = field[:-3] + 'rus'

        if Translation.objects.filter(key=key).exists():
            obj_eng = Translation.objects.get(language='ENG', key=key)
            obj_rus = Translation.objects.get(language='RUS', key=key)

            obj_eng.value = data[eng]
            obj_rus.value = data[rus]

            obj_eng.save()
            obj_rus.save()
        else:
            Translation.objects.bulk_create(
                [Translation(language='ENG', key=key, value=data[eng]),
                 Translation(language='RUS', key=key, value=data[rus])])
    product.discount.save()
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
        product = Product.objects.get(_id=pk, active=True)
        product.delete()
    except:
        raise NotFound()

    return Response('Product Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    ord = data['ord']

    try:
        product = Product.objects.get(_id=product_id, active=True)
    except:
        raise ValidationError('Products with this id does not exist')

    picture = Picture()
    picture.product = product
    picture.ord = ord
    picture.picture = request.FILES.get('picture')
    picture.save()

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


@api_view(['GET'])
def getWarehouses(request):
    language = request.query_params.get('language')

    warehouses = Warehouse.objects.all()
    serializer = WarehouseSerializer(warehouses, many=True)

    if language is not None and language != '':
        for product in serializer.data:
            try:
                # Get the translation for the product's name_geo in the specified language
                translation = Translation.objects.get(language=language, key=product['location'])
                product['location'] = translation.value
            except Translation.DoesNotExist:
                pass  # If no translation is found, keep the original value
    return Response(serializer.data)


@api_view(['GET'])
def getProductImagesById(request, pk):
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
        product = Picture.objects.filter(product_id=pk)
    except:
        raise ValidationError('Product with this ID does now exist')

    serializer = ProductImageSerializer(product, many=True)

    return Response(serializer.data)
