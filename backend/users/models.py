from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _


def phone_is_digit(value):
    """Phone number is digit validator."""
    if not value.isdigit():
        raise ValidationError(
            ('Номер телефона может состоять только из цифр.'),
            params={'value': value},
        )


def profile_photo(instance, filename):
    """Return path to save user profile photo and rename uploaded file."""
    new_filename = f'{instance.id}-{instance.role}.{filename.split(".")[-1]}'
    return f'profile-photo/{new_filename}'


class UserManager(BaseUserManager):
    def create_user(
        self,
        email: str,
        password: str,
        first_name: str,
        last_name: str,
        **extra_fields
    ) -> "User":
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            **extra_fields
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(
        self,
        email: str,
        password: str,
        first_name: str,
        last_name: str,
        **extra_fields
    ):
        user = self.create_user(
            email, password, first_name, last_name, **extra_fields
        )
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractUser):
    """Custom user model."""
    class Role(models.TextChoices):
        USER = 'USER', 'Пользователь'
        ADMIN = 'ADMIN', 'Администратор'

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    username = None
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=150)
    middle_name = models.CharField('отчество', max_length=32, blank=True)
    last_name = models.CharField(_('last name'), max_length=150)
    role = models.CharField(
        verbose_name='роль',
        max_length=16,
        choices=Role.choices,
        default=Role.USER,
    )
    phone = models.CharField(
        verbose_name='телефон',
        max_length=18,
        blank=True,
        validators=[]
    )
    photo = models.ImageField(
        verbose_name='фото пользователя',
        upload_to=profile_photo,
        blank=True
    )

    objects = UserManager()
