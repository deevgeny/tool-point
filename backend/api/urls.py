from django.urls import include, path

app_name = 'api'


urlpatterns = [
    path('v1/', include('api.v1.auth.urls')),
    path('v1/', include('api.v1.users.urls')),
    path('v1/', include('api.v1.products.urls')),
    path('v1/', include('api.v1.specifications.urls')),
    path('v1/', include('api.v1.lineproblems.urls')),
    path('v1/', include('api.v1.containments.urls')),
    path('v1/', include('api.v1.countermeasures.urls')),
    path('v1/', include('api.v1.extraactions.urls')),
    path('v1/', include('api.v1.extrasampleactions.urls')),
    path('v1/', include('api.v1.processactions.urls')),
    path('v1/', include('api.v1.productactions.urls')),
    path('v1/', include('api.v1.sampleactions.urls')),
]
