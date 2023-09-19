from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny

schema_view = get_schema_view(
    openapi.Info(
        title='Tool Point',
        default_version='v1.0',
        license=openapi.License(
            name='MIT License',
            url='https://github.com/deevgeny/tool-point/blob/main/LICENSE'
        ),
    ),
    url='http://194.87.98.159/api/v1',  # Change to your ip or domain
    public=True,
    permission_classes=(AllowAny,),
)
