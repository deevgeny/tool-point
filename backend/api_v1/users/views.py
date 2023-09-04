from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer


class UserViews(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserCreateView(APIView):
    def post(self, request):
        print(request.data)

        return Response({'answer': 'hello'})
