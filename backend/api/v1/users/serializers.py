from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserReadSerializer(serializers.ModelSerializer):
    """Read user data."""
    class Meta:
        model = User
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'email',
                  'role', 'phone', 'photo']


class UserCreateSerializer(serializers.ModelSerializer):
    """Register new user."""
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """Custom create method to correctly save password (hash)."""
        return User.objects.create_user(**validated_data)


class UserEditSerializer(serializers.ModelSerializer):
    """Edit user data by account owner.

    Note: photo update not implemented yet."""

    class Meta:
        model = User
        fields = ['first_name', 'middle_name', 'last_name', 'email', 'phone']


class UserChangePasswordSerializer(serializers.ModelSerializer):
    """Change password by account owner."""

    # Extra non model fields for user password change
    re_password = serializers.CharField(max_length=32, write_only=True)
    new_password = serializers.CharField(max_length=32, write_only=True)

    class Meta:
        model = User
        fields = ['new_password', 're_password']

    def validate(self, attrs):
        """Custom validation of password and re_password fields."""
        errors = {}
        if not attrs.get('new_password'):
            errors.update({'new_password': 'Обязательное поле.'})
        if not attrs.get('re_password'):
            errors.update({'re_password': 'Обязательное поле.'})
        if errors:
            raise serializers.ValidationError(errors)
        if attrs.get('new_password') != attrs.get('re_password'):
            raise serializers.ValidationError(
                {'detail': 'Пароли не совпадают.'}
            )
        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data.get('new_password'))
        instance.save()
        return instance
