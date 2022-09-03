# import datetime
# import jwt
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.exceptions import AuthenticationFailed
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.response import Response
# from rest_framework_jwt.settings import api_settings
#
# from .models import Product, User
# from .serializers import ProductSerializer, UserSerializer
#
# # Get the JWT settings
# jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
# jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
#
#
# @api_view(['POST'])
# def RegisterView(request):
#     serializer = UserSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     serializer.save()
#     return Response(serializer.data)
#
#
# @api_view(['POST'])
# def LoginView(request):
#     email = request.data['email']
#     password = request.data['password']
#
#     user = User.objects.filter(email=email).first()
#
#     if user is None:
#         raise AuthenticationFailed('User not found!')
#
#     if not user.check_password(password):
#         raise AuthenticationFailed('Incorrect password!')
#
#     payload = {
#         'id': user.id,
#         'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
#         'iat': datetime.datetime.utcnow()
#     }
#
#     token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')
#
#     response = Response()
#
#     response.set_cookie(key='jwt', value=token, httponly=True)
#     response.data = {
#         'jwt': token
#     }
#     return response
#
#
# @api_view(['GET'])
# def UserView(request):
#     token = request.COOKIES.get('jwt')
#
#     if not token:
#         raise AuthenticationFailed('Unauthenticated!')
#
#     try:
#         payload = jwt.decode(token, 'secret', algorithm=['HS256'])
#     except jwt.ExpiredSignatureError:
#         raise AuthenticationFailed('Unauthenticated!')
#
#     user = User.objects.filter(id=payload['id']).first()
#     serializer = UserSerializer(user)
#
#     return Response(serializer.data)
#
#
# @api_view(['POST'])
# def LogoutView(request):
#     response = Response()
#     response.delete_cookie('jwt')
#     response.data = {
#         'message: success'
#     }
#
#     return response
#
#
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getUserProfile(request):
#     user = request.user
#     serializer = UserSerializer(user, many=False)
#     return Response(serializer.data)
#
#
# @api_view(['GET'])
# @permission_classes([IsAdminUser])
# def getUsers(request):
#     users = User.objects.all()
#     serializer = UserSerializer(users, many=True)
#     return Response(serializer.data)
#
#
#
