from itertools import zip_longest

import pytest
from django.contrib.auth import get_user_model
from django.core.validators import MaxLengthValidator, MinLengthValidator
from django.db import models

User = get_user_model()


@pytest.mark.parametrize('_class, constant',
                         zip_longest([], ['Role'],
                                     fillvalue=User))
def test_model_enum_choice_exists(_class, constant):
    assert hasattr(_class, constant), f'Missing {_class}.{constant} enum choice'


@pytest.mark.parametrize('choice, name',
                         [[User.Role.USER.name, 'USER'],
                          [User.Role.ADMIN.name, 'ADMIN'],])
def test_model_role_enum_choice_field_names(choice, name):
    assert choice == name, f'Incorrect {choice} name'


@pytest.mark.parametrize('choice, label',
                         [[User.Role.USER.label, 'Пользователь'],
                          [User.Role.ADMIN.label, 'Администратор'],])
def test_model_role_enum_choice_field_labels(choice, label):
    assert choice == label, f'Incorrect {choice} label'


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'адрес электронной почты'],
                          ['unique', True]])
def test_email_field(field_attr, value):
    field = 'email'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'имя'],
                          ['max_length', 150],
                          ['blank', False]])
def test_first_name_field(field_attr, value):
    field = 'first_name'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'отчество'],
                          ['max_length', 32],
                          ['blank', True]])
def test_middle_name_field(field_attr, value):
    field = 'middle_name'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'фамилия'],
                          ['max_length', 150],
                          ['blank', False]])
def test_last_name_field(field_attr, value):
    field = 'last_name'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'роль'],
                          ['max_length', 16],
                          ['choices', User.Role.choices],
                          ['default', User.Role.USER]])
def test_role_field(field_attr, value):
    field = 'role'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'телефон'],
                          ['max_length', 10],
                          ['blank', True],])
def test_phone_field(field_attr, value):
    field = 'phone'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


def test_phone_fields_validators():
    field = 'phone'
    count = 3
    validators = ['phone_is_digit']
    assert len(User._meta.get_field(field).validators) == count, (
        f'User.{field} should have {count} validators'
    )
    assert User._meta.get_field(field).validators[0].__name__ in validators, (
        '`phone_is_digit` validator is missing'
    )
    assert isinstance(User._meta.get_field(field).validators[1],
                   MinLengthValidator), 'MinLengthValidator is missing'
    assert isinstance(User._meta.get_field(field).validators[2],
                   MaxLengthValidator), 'MaxLengthValidator is missing'


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'фото пользователя'],
                          ['blank', True],])
def test_photo_field(field_attr, value):
    field = 'photo'
    assert getattr(User._meta.get_field(field), field_attr) == value, (
        f'User.{field} field should be defined as {field_attr}={repr(value)}'
    )


def test_photo_field_upload_to_attr():
    ...


def test_profile_photo_func():
    ...


def test_phone_is_digit_func():
    ...


def test_user_model_login_field():
    username_field = 'email'
    assert User.USERNAME_FIELD == username_field, (
        'User.USERNAME_FIELD should be defined as '
        f'USERNAME_FIELD = {username_field}'
    )