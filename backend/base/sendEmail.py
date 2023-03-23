from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from .templates import generate_verification_template, password_reset_template, order_details_template
from django.urls import path
from celery import shared_task


def sendMail(id, first_name, receiver, token, ):
    send_mail(
        subject='Verification',
        message=f'Please click the following link to verify your email:',
        html_message=generate_verification_template(first_name,
                                                    'http://localhost:3000/verification/' + str(id) + '/' + str(token)),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[receiver])


def sendPasswordResetEmail(id, first_name, receiver, password_reset_token, ):
    send_mail(
        subject='Password reset',
        message=f'Please click the following link to reset your password:',
        html_message=password_reset_template(first_name,
                                             'http://localhost:3000/password-reset/' + str(id) + '/' + str(
                                                 password_reset_token)),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[receiver],
        fail_silently=False,
    )


def sendOrderDetails(user, order, orderItems, receiver):
    send_mail(
        subject='Order Details',
        message=f'Information On This Order',
        html_message=order_details_template(user, order, orderItems),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[receiver],
        fail_silently=False,
    )
