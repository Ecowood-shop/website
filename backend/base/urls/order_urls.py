from django.urls import path
from base.views import order_views as views

urlpatterns = [

    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),

    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),

    path('prices/', views.getShippingPrices, name='shipping-prices'),
    path('shippingPrice/create/', views.createShippingPrice, name='create-shipping-price'),
    path('shippingPrice/delete/<str:pk>/', views.deleteShippingPrice, name='delete-shipping-price'),
    path('shippingPrice/update/<str:pk>/', views.updateShippingPrice, name='update-shipping-price'),

    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
    path('<str:pk>/delete/', views.deleteOrder, name='delete'),
]
