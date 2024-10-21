from rest_framework import generics , permissions
from api.models import Commitment_Role
from api.serializers.commitment_role_serializer import CommitmentRoleSerializer

class CommitmentRoleListView(generics.ListAPIView):
    queryset = Commitment_Role.objects.all() 
    serializer_class = CommitmentRoleSerializer
    permission_classes = [permissions.IsAuthenticated]