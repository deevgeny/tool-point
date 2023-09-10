from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import UserAccountView

app_name = 'api_v1'

router = DefaultRouter(trailing_slash=False)
router.register('users', UserAccountView)

urlpatterns = [
    # path('users', UserCreateView.as_view()),
    # path('users/me', UserViews.as_view()),  # Temporary path
    path('', include(router.urls))
]
