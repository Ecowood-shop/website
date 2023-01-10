from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.LoginUser, name='login'),
    path('register/', views.RegisterUser, name='register'),
    path('logout/', views.LogoutUser, name='logout'),

    path('profile/', views.getUserProfile, name='user'),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),

    path('', views.getUsers, name="users"),
    path('<str:pk>/', views.getUserById, name='user'),

    path('update/<str:pk>/', views.updateUserById, name='user-update-by-id'),
    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),

    path('verify/<str:pk>/<str:token>/', views.verify_email, name='verify-email'),
]