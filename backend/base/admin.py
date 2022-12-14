from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User, Product, Category, Discount, Color, Variants, Warehouse, AddToCart, Picture, Order, OrderItem, ShippingAddress, ShippingPrices


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)


# Register your models here.

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Color)
admin.site.register(Discount)
admin.site.register(Variants)
admin.site.register(Warehouse)
admin.site.register(AddToCart)
admin.site.register(Picture)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(ShippingPrices)




# admin.site.register(Review)
# admin.site.register(Order)
# admin.site.register(OrderItem)
# admin.site.register(ShippingAddress)
