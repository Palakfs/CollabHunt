from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.models import CustomUser
from rest_framework import status

class GetUserEnrol(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request, user_id):
        try:
            
            user = CustomUser.objects.get(id=user_id)
            return Response({"user_enrol": user.user_enrol}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
