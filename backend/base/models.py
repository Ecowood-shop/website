from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    """User model."""
    first_name = models.CharField(max_length=240)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(_('email address'), blank=False, unique=True, max_length=254)
    phone = models.CharField(max_length=50)
    email_verification_token = models.CharField(max_length=200, null=True, blank=True)
    is_email_verified = models.BooleanField(default=False)
    expiration_date = models.DateTimeField(null=True)

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()


class Category(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Color(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Discount(models.Model):
    name = models.CharField(max_length=100, null=False)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    active = models.BooleanField(default=True)

    objects = models.Manager()

    def is_active(self):
        now = timezone.now()
        if self.start_date is not None and self.end_date is not None:
            return self.active and self.start_date <= now <= self.end_date
        else:
            return self.active

    def __str__(self):
        return str(self.name)


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name_geo = models.CharField(max_length=200, null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    variant = models.CharField(max_length=10, default="None")
    size = models.CharField(max_length=10, null=True, blank=True)
    technicalRequirements = models.TextField(null=True, blank=True)
    instructionForUse = models.TextField(null=True, blank=True)
    safetyStandard = models.TextField(null=True, blank=True)
    coverageLength = models.CharField(max_length=200, null=True, blank=True)
    youtubeUrl = models.URLField(max_length=200, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=True)
    discount = models.ForeignKey(Discount, null=True, default='0', on_delete=models.SET_NULL)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    active = models.BooleanField(default=True)

    def get_discount(self, user):
        specific_discount = SpecificDiscount.objects.filter(user=user, product=self, active=True).order_by(
            '-percentage').first()
        global_discount = Discount.objects.filter(product=self, active=True).order_by('-percentage').first()
        if specific_discount and specific_discount.is_active() and global_discount and global_discount.is_active():
            return specific_discount.percentage if specific_discount.percentage.percentage > global_discount.percentage else global_discount
        elif specific_discount and specific_discount.is_active():
            return specific_discount.percentage
        elif global_discount and global_discount.is_active():
            return global_discount
        else:
            discount, _ = Discount.objects.get_or_create(percentage=0, defaults={'name': '0% discount'})
            return discount

    def delete(self, *args, **kwargs):
        self.active = False
        self.save()

        if self.discount:
            self.discount.delete()

        # Get the related variants and set their active field to False
        variants = self.variants.all()
        for variant in variants:
            variant.active = False
            variant.save()

    def __str__(self):
        return str(self.name_geo)


class SpecificDiscount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    percentage = models.ForeignKey(Discount, null=True, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    objects = models.Manager()

    def is_active(self):
        return self.percentage.is_active() if self.percentage else False

    def __str__(self):
        return str(self.percentage)


class Variants(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    color = models.ForeignKey(Color, on_delete=models.CASCADE, blank=True, null=True)
    quantity = models.IntegerField(null=True, blank=True, default=0)
    active = models.BooleanField(default=True)

    def delete(self, *args, **kwargs):
        self.active = False
        self.save()

    def __str__(self):
        return self.title


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    wants_delivery = models.BooleanField(default=False)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    physicPerson = models.BooleanField(default=True)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    variant = models.ForeignKey(Variants, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingPrices(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    location = models.CharField(max_length=200, null=True, blank=True)
    limit = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=True)
    upperLimit = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=True)
    lowerLimit = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.location)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    first_name = models.CharField(max_length=240, null=True, blank=False)
    last_name = models.CharField(max_length=255, null=True, blank=False)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.ForeignKey(ShippingPrices, on_delete=models.CASCADE, related_name='shipping_prices')
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    personId = models.CharField(max_length=11, null=True, blank=True)
    phone = models.CharField(max_length=50)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)


class Warehouse(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    location = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.location)


class WithoutShipping(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    surname = models.CharField(max_length=200, null=True, blank=True)
    personId = models.CharField(max_length=11, null=True, blank=True)
    phone = models.CharField(max_length=12, null=True)
    warehouse = models.ForeignKey(Warehouse, null=True, on_delete=models.CASCADE)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.phone)


class AddToCart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variants = models.ForeignKey(Variants, on_delete=models.CASCADE)
    qty = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return str(self.product)


class Picture(models.Model):
    picture = models.ImageField(null=True, blank=True, default='/placeholder.png')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    ord = models.IntegerField(null=False, blank=True, default=1)

    def __str__(self):
        return str(self.picture)
