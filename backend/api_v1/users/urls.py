from django.urls import path
from .views import UserViews

app_name = 'api_v1'


urlpatterns = [
    path('users/me', UserViews.as_view(), name='users_me')
]
