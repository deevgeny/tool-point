from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import LineProblemViewSet

router = DefaultRouter(trailing_slash=False)
router.register('line-problems', LineProblemViewSet)

urlpatterns = [
    path('', include(router.urls))
]
