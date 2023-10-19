from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProductSpecificationViewSet, ProductViewSet

router = DefaultRouter(trailing_slash=False)
router.register('products', ProductViewSet)
router.register('product-specifications', ProductSpecificationViewSet)

urlpatterns = [
    path('', include(router.urls))
]
