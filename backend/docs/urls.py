from django.urls import re_path

from docs.views import schema_view

app_name = 'docs'


urlpatterns = [
    re_path(
        r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0),
        name='schema-json'
    ),
    re_path(
        r'^swagger$',
        schema_view.with_ui('swagger', cache_timeout=0),
        name='schema-swagger-ui'
    )
]
