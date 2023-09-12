from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom token pair serializer."""
    @classmethod
    def get_token(cls, user):
        """Add user role to token payload."""
        token = super().get_token(user)
        token['role'] = user.role
        return token


class UserReadSerializer(ModelSerializer):
    """Read user data."""
    class Meta:
        model = User
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'email',
                  'role', 'phone', 'photo']


class UserCreateSerializer(ModelSerializer):
    """Register new user."""
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """Custom create method to correctly save password (hash)."""
        return User.objects.create_user(**validated_data)


class UserEditSerializer(ModelSerializer):
    """Edit user data by account owner.

    Note: photo update not implemented yet."""
    class Meta:
        model = User
        fields = ['first_name', 'middle_name', 'last_name', 'email', 'phone']
