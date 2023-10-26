from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ContainmentViewSet

router = DefaultRouter(trailing_slash=False)
router.register('containments', ContainmentViewSet)

urlpatterns = [
    path('', include(router.urls))
]
