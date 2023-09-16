import pytest
from rest_framework import status

from . import urls

pytestmark = [pytest.mark.api]


@pytest.mark.parametrize('url',
                         [urls.TOKEN_OBTAIN, urls.TOKEN_REFRESH,
                          urls.TOKEN_VERIFY])
def test_endpoints_available(url, api_client):
    response = api_client.get(url)
    assert response.status_code != status.HTTP_404_NOT_FOUND, (
        f'Endpoint `{url}` not found'
    )


def test_token_obtain(api_client, user):
    user_obj, pwd = user
    data = {'email': user_obj.email, 'password': pwd}
    response = api_client.post(urls.TOKEN_OBTAIN, data=data)
    assert response.status_code == status.HTTP_200_OK, 'Incorrect status code'
    assert 'access' in response.data, 'No access token in response data'
    assert 'refresh' in response.data, 'No refresh token in response data'


def test_token_refresh(api_client, tokens):
    _, refresh = tokens
    data_key = 'access'
    response = api_client.post(urls.TOKEN_REFRESH, data={'refresh': refresh})
    assert response.status_code == status.HTTP_200_OK, (
        f'{urls.TOKEN_REFRESH}: incorrect status for successfull token refresh'
    )
    assert data_key in response.data, (
        f'{urls.TOKEN_REFRESH}: `{data_key}` key is missing in response data'
    )


def test_token_verify(api_client, tokens):
    access, refresh = tokens
    response = api_client.post(urls.TOKEN_VERIFY, data={'token': access})
    assert response.status_code == status.HTTP_200_OK, (
        f'{urls.TOKEN_VERIFY}: incorrect status for successfull access token verify'
    )
    response = api_client.post(urls.TOKEN_VERIFY, data={'token': refresh})
    assert response.status_code == status.HTTP_200_OK, (
        f'{urls.TOKEN_VERIFY}: incorrect status for successfull refresh token verify'
    )
    response = api_client.post(urls.TOKEN_VERIFY, data={'token': access[:-1]})
    assert response.status_code == status.HTTP_401_UNAUTHORIZED, (
        f'{urls.TOKEN_VERIFY}: incorrect status for access token verify failure'
    )
    response = api_client.post(urls.TOKEN_VERIFY, data={'token': refresh[:-1]})
    assert response.status_code == status.HTTP_401_UNAUTHORIZED, (
        f'{urls.TOKEN_VERIFY}: incorrect status for refresh token verify failure'
    )
