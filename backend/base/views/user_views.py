import datetime
import jwt
from django.contrib.auth.hashers import make_password
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import AuthenticationFailed, NotFound, ValidationError
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings

from base.models import Product, User
from base.serializers import ProductSerializer, UserSerializer

from django.core.mail import send_mail
from django.conf import settings
from base.templates import generate_verification_template

# Get the JWT settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


@api_view(['POST'])
def RegisterUser(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def LoginUser(request):
    email = request.data['email']
    password = request.data['password']

    user = User.objects.filter(email=email).first()

    if user is None:
        raise AuthenticationFailed('User not found!')

    if not user.check_password(password):
        raise AuthenticationFailed('Incorrect password!')

    payload = {
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }

    token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')

    response = Response()

    response.set_cookie(key='jwt', value=token, httponly=True)
    response.data = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'isAdmin': user.is_staff
    }
    return response


@api_view(['GET'])
def getUserProfile(request):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = User.objects.filter(id=payload['id']).first()
    serializer = UserSerializer(user)

    return Response(serializer.data)


@api_view(['PUT'])
def updateUserProfile(request):
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
        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.phone = data['phone']

        if data['password'] != '':
            user.password = make_password(data['password'])

        user.save()

    except:
        raise ValidationError()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['POST'])
def LogoutUser(request):
    response = Response()
    response.delete_cookie('jwt')
    response.data = {
        'message: success'
    }

    return response


@api_view(['GET'])
def getUsers(request):
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

    users = User.objects.filter(Q(first_name__icontains=query)
                                | Q(last_name__icontains=query) | Q(email__icontains=query))

    is_staff = request.query_params.get('is_staff')

    if is_staff is None or query == "null":
        is_staff = ''

    users = users.filter(is_staff__icontains=is_staff)

    page = request.query_params.get('page')
    paginator = Paginator(users, 5)

    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)

    if page is None or page == "null":
        page = 1

    page = int(page)
    print('Page:', page)
    print(users)

    serializer = UserSerializer(users, many=True)
    return Response({'users': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getUserById(request, pk):
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
        userById = User.objects.get(id=pk)
    except:
        raise NotFound()

    serializer = UserSerializer(userById, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateUserById(request, pk):
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
        userById = User.objects.get(id=pk)
    except:
        raise NotFound()

    data = request.data

    userById.first_name = data['first_name']
    userById.last_name = data['last_name']
    userById.phone = data['phone']
    userById.email = data['email']
    userById.is_staff = data['is_staff']

    userById.save()

    serializer = UserSerializer(userById, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
def deleteUser(request, pk):
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
        userForDeletion = User.objects.get(id=pk)
        userForDeletion.delete()
    except:
        raise NotFound()
    return Response('User was deleted')


def sendMail(token, receiver):
    send_mail(
        subject='Verification',
        message='Rame',
        html_message=generate_verification_template('Temo',  'Google.com'),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[receiver])