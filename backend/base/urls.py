from django.urls import path
from . import views

urlpatterns = [
    path('users/login/', views.LoginView, name='login'),
    path('users/register/', views.RegisterView, name='register'),

    path('users/logout/', views.LogoutView, name='logout'),

    path('users/user/', views.UserView, name='user'),

    path('users/', views.getUsers, name="users"),
    path('users/profile/', views.getUserProfile, name="users-profile"),

    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>/', views.getProduct, name="product"),

]
