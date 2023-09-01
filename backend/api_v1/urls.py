from django.urls import path, include

app_name = 'api_v1'


urlpatterns = [
    path('', include('djoser.urls.jwt')),
    path('', include('api_v1.users.urls'))
]
