from django.core.mail import send_mail
from django.conf import settings
from .templates import generate_verification_template


def sendMail(token, receiver):
    send_mail(
        subject='Verification',
        message='Rame',
        html_message=generate_verification_template('Temo',  'Google.com'),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[receiver])
