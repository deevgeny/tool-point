from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer


class UserViews(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)

        print(vars(request.user))
        return Response(serializer.data)
