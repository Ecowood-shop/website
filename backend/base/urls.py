from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    # path('products/', views.getProductCategories, name="products"),
    # path('products/<>', views.getProductCategories, name="products"),

]
