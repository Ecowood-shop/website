from rest_framework import serializers
import django.contrib.auth.password_validation as validators

from .models import Product, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_password(self, data):
        validators.validate_password(password=data, user=User)
        return data

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

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
    class Meta:
        model = Product
        fields = '__all__'
