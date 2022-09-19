from rest_framework import serializers
import django.contrib.auth.password_validation as validators

from .models import Product, User, Category

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


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.name')
    color = serializers.ReadOnlyField(source='color.name')
    discount = serializers.ReadOnlyField(source='discount.name')

    class Meta:
        model = Product
        fields = ['_id', 'category', 'color', 'discount', 'name_geo',
                  'name_eng', 'name_rus', 'image', 'brand', 'size',
                  'description_geo', 'description_eng', 'description_rus', 'rating',
                  'price', 'countInStock', 'createdAt', 'user']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['_id', 'name']


class TopProductSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Product
        fields = ['_id', 'name_geo', 'price', 'image', 'category']
