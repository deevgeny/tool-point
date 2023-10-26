from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ExtraSampleActionViewSet

router = DefaultRouter(trailing_slash=False)
router.register('extra-samples', ExtraSampleActionViewSet)

urlpatterns = [
    path('', include(router.urls))
]
