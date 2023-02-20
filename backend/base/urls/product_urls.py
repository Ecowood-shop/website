from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.getProducts, name="products"),

    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),
    path('image/delete/<str:pk>/', views.deleteImage, name="deleteImage"),

    path('image/<str:pk>/', views.getProductImagesById, name="getImages"),

    path('categories/', views.getCategories, name="category"),
    path('colors/', views.getProductColors, name="colors"),

    path('cartload/<str:pk>/', views.addToCart, name='addToCart'),
    path('removecart/<str:pk>/', views.deleteCart, name='deleteCart'),
    path('updatecart/<str:pk>/', views.updateCart, name='updateCart'),
    path('cart/', views.getUserCart, name='cart'),

    path('variants/<str:pk>/', views.getProductVariants, name='variants'),
    path('variants/create', views.createVariants, name="variant-create"),
    path('variants/update/<str:pk>/', views.updateVariant, name="variant-update"),
    path('variants/delete/<str:pk>/', views.deleteVariant, name="variant-delete"),

    path('category/create', views.createCategory, name='create-category'),
    path('category/delete/<str:pk>/', views.deleteCategory, name='delete-category'),

    path('latest/', views.getLatestProducts, name='latest-products'),
    path('latest/<str:pk>/', views.getLatestProduct, name="latest-product-by-category"),

    path('warehouses/', views.getWarehouses, name="warehouses"),


    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),

    path('discounts/', views.getDiscounts, name="discounts"),
    path('discount/create/', views.createDiscount, name="create-discount"),
    path('delete/discount/<str:pk>/', views.deleteDiscount, name="discount-delete"),

    path('specific/discount/', views.createSpecificDiscount, name="create-specific-discount"),
    path('specific/discounts/', views.getSpecificDiscounts, name="specific-discounts"),
    path('delete/specific/discount/<str:pk>/', views.deleteSpecificDiscount, name="specific-discount-delete"),

    path('<str:pk>/', views.getProduct, name="product"),

]

