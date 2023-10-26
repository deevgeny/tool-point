from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import SampleActionViewSet

router = DefaultRouter(trailing_slash=False)
router.register('sample-actions', SampleActionViewSet)

urlpatterns = [
    path('', include(router.urls))
]
