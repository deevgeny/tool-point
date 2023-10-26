from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CountermeasureViewSet

router = DefaultRouter(trailing_slash=False)
router.register('countermeasures', CountermeasureViewSet)

urlpatterns = [
    path('', include(router.urls))
]
