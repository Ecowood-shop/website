import datetime

import django.contrib.auth.password_validation as validators
import jwt
from base.generator import generate_random_code
from base.models import User
from base.sendEmail import sendPasswordResetEmail
from base.serializers import UserSerializer, JustUsersSerializer
from base.templates import generate_verification_template
from django.conf import settings
from django.core.mail import send_mail
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Q
from django.utils import timezone
from django_ratelimit.decorators import ratelimit
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed, NotFound, ValidationError
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings

# Get the JWT settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


@api_view(['POST'])
def RegisterUser(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)


@ratelimit(key='user', rate='5/m', block=True)
@api_view(['POST'])
def verify_email(request, pk, token):
    try:
        user = User.objects.get(id=pk)
    except User.DoesNotExist:
        raise AuthenticationFailed('User not found!')

    if user.expiration_date < timezone.now():
        return AuthenticationFailed('expired_token')

    if user.email_verification_token == token and not user.is_email_verified:
        user.is_email_verified = True

        user.save()

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True, secure=True)
        response.set_cookie(key='altax', value="Copyright C 2022 Altax.ge. All rights reserved", httponly=False,
                            secure=True)

        response.data = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'isAdmin': user.is_staff
        }
        return response

    return Response('message: Verification Rejected')


@api_view(['POST'])
def forgotPassword(request):
    email = request.data.get('email')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        raise AuthenticationFailed('Email address does not exist.')

    # Generate a password reset token and set its expiration date
    user = User.objects.get(email=email)
    user.password_reset_token = generate_random_code()
    user.password_reset_token_expiration_date = timezone.now() + timezone.timedelta(hours=1)
    user.save()

    # Send the password reset email to the user
    try:
        sendPasswordResetEmail(user.id, user.first_name, user.email, user.password_reset_token, )
    except:
        raise Exception

    return Response('Password reset email sent.')


@api_view(['POST'])
def resetPassword(request, pk, token):
    try:
        user = User.objects.get(id=pk, password_reset_token=token)
    except User.DoesNotExist:
        raise AuthenticationFailed('Invalid reset link.')

    if user.password_reset_token_expiration_date < timezone.now():
        raise AuthenticationFailed('Reset link expired.')

    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')

    if password != confirm_password:
        raise ValidationError('Passwords do not match.')

    validators.validate_password(password=password, user=User)

    user.set_password(password)
    user.password_reset_token = None
    user.password_reset_token_expiration_date = None
    user.save()

    return Response('Password reset successful.')


@api_view(['POST'])
def LoginUser(request):
    email = request.data['email']
    password = request.data['password']

    user = User.objects.filter(email=email).first()

    if user is None:
        raise AuthenticationFailed('User not found!')

    if not user.is_email_verified:
        raise AuthenticationFailed('You need to verify your account')

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
    response.set_cookie(key='altax', value="Copyright C 2022 Altax.ge. All rights reserved", httponly=False)
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
        if data['first_name']:
            user.first_name = data['first_name']
        if data['last_name']:
            user.last_name = data['last_name']
        if data['phone']:
            user.phone = data['phone']

        if data['password'] != '':
            if data['password'] != data['confirm_password']:
                raise ValidationError('Passwords do not match')
            else:
                try:
                    validators.validate_password(password=data['password'], user=user)
                except:
                    raise ValidationError('Password missing uppercase, lowercase or digit.')

        user.save()

    except ValidationError as e:
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['POST'])
def LogoutUser(request):
    response = Response()
    response.delete_cookie('jwt')
    response.delete_cookie('altax')

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

    if is_staff is None or is_staff == "null":
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
def getJustUsers(request):
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
        users = User.objects.all()
    except:
        raise ValidationError('There is no User yet')

    userSerializer = JustUsersSerializer(users, many=True)
    return Response(userSerializer.data)


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

    if data['first_name']:
        userById.first_name = data['first_name']
    if data['last_name']:
        userById.last_name = data['last_name']
    # userById.phone = data['phone']
    if data['email']:
        userById.email = data['email']
    if data['is_staff']:
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
        html_message=generate_verification_template('Temo', 'Google.com'),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[receiver])
