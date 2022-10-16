from rest_framework import serializers
import django.contrib.auth.password_validation as validators

from .models import Product, User, Category, Variants, \
    ShippingAddress, Order, OrderItem, Color, AddToCart, Picture

from .generator import generate_random_code
from .sendEmail import sendMail


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

        user.is_active = False
        user.save()

        sendMail(user.email_verification_token, 'temopkhakadze2002@gmail.com')

        return user

    # def create(self, validated_data):
    #     user = User.objects.create_user(**validated_data)
    #     # user.is_active = Falseprint
    #     # user.is_staff = False
    #     user.save()
    #     return user


class TokenSerializer(serializers.Serializer):
    """
    This serializer serializes the token data
    """
    token = serializers.CharField(max_length=255)


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ['id', 'picture', 'ord']


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.name')
    discount = serializers.ReadOnlyField(source='discount.name')
    picture_set = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = ['_id', 'category', 'discount', 'name_geo', 'picture_set', 'brand', 'size',
                  'technicalRequirements', 'instructionForUse', 'safetyStandard',
                  'youtubeUrl', 'coverageLength', 'price', 'createdAt', 'user']


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


class TopProductSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.name')
    picture_set = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = ['_id', 'name_geo', 'price', 'picture_set', "size", 'category']


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

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

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class AddToCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddToCart
        fields = ['id', 'user', 'product', 'variants', 'qty']
        read_only_fields = ['user', 'product']


class SpecificProductSerializer(serializers.ModelSerializer):
    discount = serializers.ReadOnlyField(source='discount.discount_percent')
    picture_set = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = ['_id', 'name_geo', 'picture_set', 'size', 'price', 'discount']
