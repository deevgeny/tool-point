import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from tests.api_v1 import urls

User = get_user_model()


@pytest.fixture(scope='session')
def api_client():
    client = APIClient()
    return client


@pytest.fixture
def tokens(user, api_client):
    user_obj, pwd = user
    data = {'email': user_obj.email, 'password': pwd}
    response = api_client.post(urls.TOKEN_OBTAIN, data=data)
    return response.data.get('access'), response.data.get('refresh')
