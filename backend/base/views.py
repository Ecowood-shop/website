import jwt
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Product, User

from .serializers import ProductSerializer, UserSerializer, MyTokenObtainPairSerializer

from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.tokens import RefreshToken

from .utils import Util

from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

from django.conf import settings

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)
#
#         refresh = self.get_token(self.user)
#
#         data['refresh'] = str(refresh)
#         data['access'] = str(refresh.access_token)
#         data['first_name'] = self.user.first_name
#         data['last_name'] = self.user.last_name
#         data['isAdmin'] = self.user.is_staff
#
#         return data
#
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#
#         # Add custom claims
#         token['username'] = user.username
#         # ...
#
#         return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class userLogin(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data

    user = User.objects.create(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=make_password(data['password'])
    )

    refresh = RefreshToken.for_user(user)

    current_site = get_current_site(request).domain
    relativeLink = reverse('email-verify')

    absurl = 'http://' + current_site + relativeLink + "?refresh=" + str(refresh.access_token)
    email_body = 'Hi ' + user.first_name + ' Use link below to verify your email \n' + absurl
    data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Verify your email'}

    Util.send_email(data)

    return Response({
        "status": "success",
        'user_id': user.id,
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }, status=status.HTTP_201_CREATED)


class VerifyEmail(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get('token')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
