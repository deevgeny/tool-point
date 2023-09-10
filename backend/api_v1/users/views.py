from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .serializers import (
    UserCreateSerializer,
    UserEditSerializer,
    UserReadSerializer,
)

User = get_user_model()


class UserAccountView(GenericViewSet, CreateModelMixin):
    """User account view.

    User actions:
        - Create new user (register): POST /
        - Get personal data at: GET /me
        - Update personal data: PATCH /me
    """

    permission_classes = [AllowAny]  # To register new users
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UserCreateSerializer
        if self.request.method == 'PATCH':
            return UserEditSerializer
        return UserReadSerializer  # Default for GET request

    @action(methods=['GET', 'PATCH'], detail=False,
            permission_classes=[IsAuthenticated])
    def me(self, request):
        """Get or update user data."""
        if request.method == 'PATCH':
            user_instance = get_object_or_404(User, id=request.user.id)
            serializer = self.get_serializer_class()(
                user_instance, data=request.data, partial=True
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        # GET request
        serializer = self.get_serializer_class()(request.user)
        return Response(serializer.data)
