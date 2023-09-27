from rest_framework import status

URL = '/docs/swagger'


def test_url_available(client):
    response = client.get(URL)
    assert response.status_code != status.HTTP_404_NOT_FOUND, (
        f'`{URL}` not found'
    )


def test_url_for_unauthenticated_user(client):
    response = client.get(URL)
    assert response.status_code == status.HTTP_200_OK, (
        f'`{URL}` response code is incorrect for unauthenticated user'
    )
