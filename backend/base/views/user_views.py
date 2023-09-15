import datetime

import django.contrib.auth.password_validation as validators
import jwt
from base.generator import generate_random_code
from base.models import User
from base.sendEmail import sendPasswordResetEmail
from base.serializers import UserSerializer, JustUsersSerializer
from base.templates import generate_verification_template
from django.conf import settings
from django.contrib.auth.hashers import make_password
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

from base.errors.translations import authentication, user_not_found, current_password_not_correct, without_permission

import threading

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
    language = request.query_params.get('language')

    try:
        user = User.objects.get(id=pk)
    except User.DoesNotExist:
        if language == 'GEO':
            return Response({'მომხმარებელი ვერ მოიძებნა!'}, status=status.HTTP_404_NOT_FOUND)
        elif language == 'ENG':
            return Response({'User not found!'}, status=status.HTTP_404_NOT_FOUND)
        elif language == 'RUS':
            return Response({'Пользователь не найден!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'User not found!'}, status=status.HTTP_404_NOT_FOUND)

    if user.expiration_date < timezone.now():
        if language == 'GEO':
            return Response({'ვერიფიკაციის დრო ამოიწურა'}, status=status.HTTP_408_REQUEST_TIMEOUT)
        elif language == 'ENG':
            return Response({'Verification Expired'}, status=status.HTTP_408_REQUEST_TIMEOUT)
        elif language == 'RUS':
            return Response({'Время проверки истекло!'}, status=status.HTTP_408_REQUEST_TIMEOUT)
        else:
            return Response({'No Order Items!'}, status=status.HTTP_408_REQUEST_TIMEOUT)

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

    if language == 'GEO':
        return Response({'ვერიფიკაცია უარყოფილია'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    elif language == 'ENG':
        return Response({'Verification Rejected'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    elif language == 'RUS':
        return Response({'Проверка отклонена'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response({'Verification Rejected'}, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
def forgotPassword(request):
    email = request.data.get('email')
    language = request.query_params.get('language')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return user_not_found(language)

    # Generate a password reset token and set its expiration date
    user = User.objects.get(email=email)
    user.password_reset_token = generate_random_code()
    user.password_reset_token_expiration_date = timezone.now() + timezone.timedelta(hours=1)
    user.save()

    # Send the password reset email to the user
    my_thread = threading.Thread(target=sendPasswordResetEmail,
                                 args=(user.id, user.first_name, user.email, user.password_reset_token), daemon=True)
    my_thread.start()

    if language == 'GEO':
        return Response({'პაროლის აღსადგენი მეილი გამოგზავნილია.'}, status=status.HTTP_200_OK)
    elif language == 'ENG':
        return Response({'Password reset email sent.'}, status=status.HTTP_200_OK)
    elif language == 'RUS':
        return Response({'Письмо для сброса пароля отправлено.'}, status=status.HTTP_200_OK)
    else:
        return Response({'Password reset email sent.'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def resetPassword(request, pk, token):
    language = request.query_params.get('language')

    try:
        user = User.objects.get(id=pk, password_reset_token=token)
    except User.DoesNotExist:
        return user_not_found(language)

    if user.password_reset_token_expiration_date < timezone.now():
        if language == 'GEO':
            return Response({'აღდგენის ბმულის ვადა ამოიწურა.'}, status=status.HTTP_408_REQUEST_TIMEOUT)
        elif language == 'ENG':
            return Response({'Reset link expired.'}, status=status.HTTP_408_REQUEST_TIMEOUT)
        elif language == 'RUS':
            return Response({'Срок действия ссылки для сброса истек.'}, status=status.HTTP_408_REQUEST_TIMEOUT)
        else:
            return Response({'Reset link expired.'}, status=status.HTTP_408_REQUEST_TIMEOUT)

    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')

    if password != confirm_password:
        if language == 'GEO':
            return Response({'Პაროლები არ ემთხვევა.'}, status=status.HTTP_408_REQUEST_TIMEOUT)
        elif language == 'ENG':
            return Response({'Passwords do not match.'}, status=status.HTTP_408_REQUEST_TIMEOUT)
        elif language == 'RUS':
            return Response({'Пароли не совпадают.'}, status=status.HTTP_408_REQUEST_TIMEOUT)
        else:
            return Response({'Passwords do not match.'}, status=status.HTTP_408_REQUEST_TIMEOUT)

    validators.validate_password(password=password, user=User)

    user.set_password(password)
    user.password_reset_token = None
    user.password_reset_token_expiration_date = None
    user.save()

    if language == 'GEO':
        return Response({'პაროლის აღდგენა წარმატებით დასრულდა.'}, status=status.HTTP_200_OK)
    elif language == 'ENG':
        return Response({'Password reset successful.'}, status=status.HTTP_200_OK)
    elif language == 'RUS':
        return Response({'Сброс пароля прошел успешно.'}, status=status.HTTP_200_OK)
    else:
        return Response({'Password reset successful.'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def LoginUser(request):
    email = request.data['email']
    password = request.data['password']

    language = request.query_params.get('language')

    user = User.objects.filter(email=email).first()

    if user is None:
        return user_not_found(language)

    if not user.is_email_verified:
        if language == 'GEO':
            return Response({'გთხოვთ გაიაროთ ვერიფიკაცია.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        elif language == 'ENG':
            return Response({'You need to verify your account'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        elif language == 'RUS':
            return Response({'Вам необходимо подтвердить свою учетную запись'},
                            status=status.HTTP_405_METHOD_NOT_ALLOWED)
        else:
            return Response({'You need to verify your account'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    if not user.check_password(password):
        if language == 'GEO':
            return Response({'პაროლი არასწორია!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        elif language == 'ENG':
            return Response({'Incorrect password!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        elif language == 'RUS':
            return Response({'Неверный пароль!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        else:
            return Response({'Incorrect password!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

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

    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()
    serializer = UserSerializer(user)

    return Response(serializer.data)


@api_view(['PUT'])
def updateUserProfile(request):
    token = request.COOKIES.get('jwt')

    language = request.query_params.get('language')

    if not token:
        return authentication(language)
    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    data = request.data

    try:
        if data['password'] != '':
            if data['new_password'] != '' and data['confirm_password'] != '' and user.check_password(
                    data['password']) and data['new_password'] == data['confirm_password']:
                try:
                    validators.validate_password(password=data['new_password'], user=user)
                    user.password = make_password(data['new_password'])

                    if data['first_name']:
                        user.first_name = data['first_name']
                    if data['last_name']:
                        user.last_name = data['last_name']
                    if data['phone']:
                        user.phone = data['phone']

                except:
                    if language == 'GEO':
                        return Response({'პაროლი აუცილებლად უნდა შეიცავდეს მინიმუმ ერთ დიდ, პატარა ასოებს და რომელიმე ციფრს.'}, status=status.HTTP_400_BAD_REQUEST)
                    elif language == 'ENG':
                        return Response({'Password missing uppercase, lowercase or digit.'}, status=status.HTTP_400_BAD_REQUEST)
                    elif language == 'RUS':
                        return Response({'В пароле отсутствуют заглавные, строчные буквы или цифры.'}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        return Response({'Password missing uppercase, lowercase or digit.'}, status=status.HTTP_400_BAD_REQUEST)

            elif data['new_password'] == '' and data['confirm_password'] == '' and user.check_password(
                    data['password']):
                if data['first_name']:
                    user.first_name = data['first_name']
                if data['last_name']:
                    user.last_name = data['last_name']
                if data['phone']:
                    user.phone = data['phone']
            else:
                return current_password_not_correct(language)
        else:
            return current_password_not_correct(language)

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
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission(language)

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
    paginator = Paginator(users, 10)

    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)

    if page is None or page == "null":
        page = 1

    page = int(page)

    serializer = UserSerializer(users, many=True)
    return Response({'users': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getJustUsers(request):
    token = request.COOKIES.get('jwt')
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission(language)

    try:
        users = User.objects.all()
    except:
        raise ValidationError('There is no User yet')

    userSerializer = JustUsersSerializer(users, many=True)
    return Response(userSerializer.data)


@api_view(['GET'])
def getUserById(request, pk):
    token = request.COOKIES.get('jwt')
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission(language)

    try:
        userById = User.objects.get(id=pk)
    except:
        return user_not_found(language)

    serializer = UserSerializer(userById, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateUserById(request, pk):
    token = request.COOKIES.get('jwt')
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission(language)

    try:
        userById = User.objects.get(id=pk)
    except:
        return user_not_found(language)

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
    language = request.query_params.get('language')

    if not token:
        return authentication(language)

    try:
        payload = jwt.decode(token, 'secret', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
        return authentication(language)

    user = User.objects.filter(id=payload['id']).first()

    if not user.is_staff:
        return without_permission(language)

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
