from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny

schema_view = get_schema_view(
    openapi.Info(
        title='Tool Point',
        default_version='v1.0',
        license=openapi.License(name='MIT License'),
    ),
    public=True,
    permission_classes=(AllowAny,),
)
