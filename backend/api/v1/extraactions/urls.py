from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ExtraActionViewSet

router = DefaultRouter(trailing_slash=False)
router.register('extra-actions', ExtraActionViewSet, 'extra-action')

urlpatterns = [
    path('', include(router.urls))
]
