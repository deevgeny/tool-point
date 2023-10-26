from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import UserAccountView

router = DefaultRouter(trailing_slash=False)
router.register('users', UserAccountView)

urlpatterns = [
    path('', include(router.urls))
]
