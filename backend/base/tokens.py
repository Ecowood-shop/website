from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six


class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
                six.text_type(user.get('id')) + six.text_type(timestamp) + six.text_type(user.get('is_active'))
        )


account_activation_token = AccountActivationTokenGenerator()
