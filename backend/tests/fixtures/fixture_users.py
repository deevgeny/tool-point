import pytest


@pytest.fixture
def user(django_user_model):
    return django_user_model.create_user(
        first_name='New',
        middle_name='Middle',
        last_name='User',
        email='u@test.com',
        phone='+79993332211',
        password='fixture123'
    )
