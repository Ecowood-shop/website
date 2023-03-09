from rest_framework import serializers
import django.contrib.auth.password_validation as validators

from .models import Product, User, Category, Variants, \
    ShippingAddress, Order, OrderItem, Color, AddToCart, Picture, WithoutShipping, Warehouse, ShippingPrices, \
    SpecificDiscount, Discount

from .generator import generate_random_code
from .sendEmail import sendMail
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'password', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_password(self, data):
        validators.validate_password(password=data, user=User)
        return data

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.email_verification_token = generate_random_code()
        user.expiration_date = timezone.now() + timezone.timedelta(days=1)
        user.is_active = False
        user.save()
        try:
            sendMail.delay(user.id, user.first_name, user.email, user.email_verification_token, )
        except Exception as e:
            user.delete()
            raise serializers.ValidationError(str(e))

        return user


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        """
        Validate that the email belongs to an existing user.
        """
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError('User not found.')
        return user.email


class TokenSerializer(serializers.Serializer):
    """
    This serializer serializes the token data
    """
    token = serializers.CharField(max_length=255)


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ['id', 'picture', 'ord']


class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = '__all__'


class ProductSerializer(DynamicFieldsModelSerializer):
    category = serializers.ReadOnlyField(source='category.name')
    category_id = serializers.ReadOnlyField(source='category._id')
    discount = DiscountSerializer(read_only=True)  # use DiscountSerializer as nested serializer
    picture_set = ProductImageSerializer(many=True)

    # variants = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = ['_id', 'category', 'category_id', 'discount', 'name_geo', 'picture_set', 'brand', 'size',
                  'technicalRequirements', 'instructionForUse', 'safetyStandard',
                  'youtubeUrl', 'coverageLength', 'price', 'createdAt', 'user']

    # def get_variants(self, obj):
    #     items = obj.variants_set.all()
    #     serializer = VariantSerializer(items, many=True)
    #     return serializer.data


class JustProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['_id', 'name_geo']


class JustUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']


class VariantSerializer(serializers.ModelSerializer):
    color = serializers.ReadOnlyField(source='color.name')
    image = serializers.ReadOnlyField(source='color.image.url')

    class Meta:
        model = Variants
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['_id', 'name']


class ShippingPricesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingPrices
        fields = '__all__'


class TopProductSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.name')
    picture_set = ProductImageSerializer(many=True)
    discount = DiscountSerializer(read_only=True)  # use DiscountSerializer as nested serializer

    class Meta:
        model = Product
        fields = ['_id', 'name_geo', 'price', 'discount', 'picture_set', "size", 'category']


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    withoutShipping = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_withoutShipping(self, obj):
        try:
            address = WithoutShippingSerializer(
                obj.withoutshipping, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data


class ShippingAddressSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField()

    class Meta:
        model = ShippingAddress
        fields = ['_id', 'first_name', 'last_name', 'address', 'postalCode', 'personId', 'phone', 'order', 'location']

    def get_location(self, obj):
        return obj.city.location


class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = '__all__'


class WithoutShippingSerializer(serializers.ModelSerializer):
    warehouse = WarehouseSerializer(many=False)

    class Meta:
        model = WithoutShipping
        fields = ['order', 'name', 'surname', 'personId', 'phone', 'warehouse']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class SpecificProductSerializer(serializers.ModelSerializer):
    discount = DiscountSerializer(read_only=True)  # use DiscountSerializer as nested serializer
    picture_set = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = ['_id', 'name_geo', 'picture_set', 'size', 'price', 'discount']


class AddToCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddToCart
        fields = ['id', 'user', 'product', 'variants', 'qty']
        read_only_fields = ['user', 'product']


class SpecificDiscountSerializer(DynamicFieldsModelSerializer):
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')
    email = serializers.ReadOnlyField(source='user.email')
    product_name = serializers.ReadOnlyField(source='product.name_geo')
    percentage = DiscountSerializer()

    class Meta:
        model = SpecificDiscount
        fields = '__all__'
