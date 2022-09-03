from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.LoginView, name='login'),
    path('register/', views.RegisterView, name='register'),

    path('logout/', views.LogoutView, name='logout'),

    path('user/', views.UserView, name='user'),

    path('', views.getUsers, name="users"),
    path('profile/', views.getUserProfile, name="users-profile"),
]