from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from .templates import generate_verification_template
from django.urls import path

def sendMail(id, first_name, receiver, token, ):
    send_mail(
        subject='Verification',
        message='Rame',
        html_message=generate_verification_template(first_name, 'http://localhost:3000/verification/' + str(id) + '/' + str(token)),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[receiver])
