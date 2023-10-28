from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProcessActionViewSet

router = DefaultRouter(trailing_slash=False)
router.register('process-actions', ProcessActionViewSet, 'process-action')

urlpatterns = [
    path('', include(router.urls))
]
