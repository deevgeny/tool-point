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
        fields = ['id', 'first_name', 'last_name', 'email', 'role']


class UserCreateSerializer(ModelSerializer):
    """Register new user."""
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']


class UserEditSerializer(ModelSerializer):
    """Edit user data by account owner."""
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

    def update(self, instance, validated_data):
        """Override update method to correctly save hashed password."""
        instance.first_name = validated_data.get('first_name',
                                                 instance.first_name)
        instance.last_name = validated_data.get('last_name',
                                                instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        if validated_data.get('password'):
            instance.set_password(validated_data.get('password'))
        instance.save()
        return instance
