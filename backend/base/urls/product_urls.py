from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.getProducts, name="products"),

    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('categories/', views.getCategories, name="category"),

    path('variants/', views.createVariants, name="variants"),
    path('category/', views.createCategory, name='create-category'),

    path('latest/', views.getLatestProducts, name='latest-products'),
    path('latest/<str:pk>/', views.getLatestProduct, name="latest-product-by-category"),

    path('<str:pk>/', views.getProduct, name="product"),


    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
]

