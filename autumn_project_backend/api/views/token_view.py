from rest_framework import generics
from rest_framework.permissions import AllowAny
from api.serializers.user_registration_serializer import UserRegistrationSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from api.models import CustomUser 

class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        user_serializer = self.get_serializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        Profile.objects.create(username=user)

        return Response(user_serializer.data, status=status.HTTP_201_CREATED)
    
class ObtainAuthToken(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_enrol = request.data.get('user_enrol')
        password = request.data.get('password')

    
        user = authenticate(request, user_enrol=user_enrol, password=password)
        
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid Credentials'}, status=400)
    
