from django.urls import include, path

app_name = 'api_v1'


urlpatterns = [
    path('', include('api_v1.auth.urls')),
    path('', include('api_v1.users.urls'))
]
