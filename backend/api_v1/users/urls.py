from django.urls import path, include
from djoser import views
from rest_framework.routers import DefaultRouter
from .views import UserViews, UserCreateView

app_name = 'api_v1'

# Override Djoser router to remove trailing slash
router = DefaultRouter(trailing_slash=False)

router.register('users', views.UserViewSet)

urlpatterns = [
    #path('users', UserCreateView.as_view()),
    #path('users/me', UserViews.as_view()),
    path('', include(router.urls))
]
