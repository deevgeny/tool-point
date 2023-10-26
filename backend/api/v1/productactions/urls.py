from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProductActionViewSet

router = DefaultRouter(trailing_slash=False)
router.register('product-actions', ProductActionViewSet)

urlpatterns = [
    path('', include(router.urls))
]
