from rest_framework import generics
from api.models import CustomUser
from api.serializers.authentication_serializer import AuthenticationSerializer
from rest_framework.views import APIView

class AuthenticationListCreateView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = AuthenticationSerializer
