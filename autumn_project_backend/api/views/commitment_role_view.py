from rest_framework import generics , permissions
from api.models import Commitment_Role
from api.serializers.commitment_role_serializer import CommitmentRoleSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class CommitmentRoleListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        categories = Commitment_Role.objects.all()
        serializer = CommitmentRoleSerializer(categories, many=True)
        return Response(serializer.data)