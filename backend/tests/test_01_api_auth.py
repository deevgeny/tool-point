import pytest
from rest_framework import status

PREFIX = '/api'
VERSION = '/v1'
TOKEN_OBTAIN = f'{PREFIX}{VERSION}/auth/token/obtain'
TOKEN_REFRESH = f'{PREFIX}{VERSION}/auth/token/refresh'
TOKEN_VERIFY = f'{PREFIX}{VERSION}/auth/token/verify'


@pytest.mark.django_db
@pytest.mark.parametrize('url', [TOKEN_OBTAIN, TOKEN_REFRESH, TOKEN_VERIFY])
def test_api_endpoints_available(url, api_client):
    response = api_client.get(url)
    assert response.status_code != status.HTTP_404_NOT_FOUND, (
        f'Endpoint {url} not found'
    )
