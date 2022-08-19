from django.urls import path
from . import views
from .views import MyTokenObtainPairView, VerifyEmail

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('users/register/', views.registerUser, name='register'),
    path('users/login/', views.userLogin.as_view(), name='login'),

    path('email-verify/', VerifyEmail.as_view(), name='email-verify'),

    path('users/', views.getUsers, name="users"),
    path('users/profile/', views.getUserProfile, name="users-profile"),

    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>/', views.getProduct, name="product"),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
