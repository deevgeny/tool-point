from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom token pair serializer."""
    @classmethod
    def get_token(cls, user):
        """Add user role to token payload."""
        token = super().get_token(user)

        token['role'] = 'user'

        return token
