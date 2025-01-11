from rest_framework import generics
from rest_framework.permissions import AllowAny
from api.serializers.user_registration_serializer import UserRegistrationSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from api.models import CustomUser 
from api.models import Profile
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from api.serializers.custom_token_serializer import CustomTokenObtainPairSerializer

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
    

class CustomRefreshToken(RefreshToken):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def add_custom_claims(self, user):
        self.payload['user_enrol'] = user.user_enrol
        return self

    
class ObtainAuthToken(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_enrol = request.data.get('user_enrol')
        password = request.data.get('password')

        user = authenticate(request, user_enrol=user_enrol, password=password)
        
        refresh = CustomRefreshToken.for_user(user)
        refresh.add_custom_claims(user)  

        if user is not None:
            refresh = RefreshToken.for_user(user)
       
            access_token = refresh.access_token
            access_token['user_enrol'] = user.user_enrol
            


            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            )
        print("Authentication failed") 
        return Response({"error": "Invalid Credentials"}, status=401)
    

    
