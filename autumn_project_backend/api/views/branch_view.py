from rest_framework import generics , permissions
from api.models import Branch
from api.serializers.branch_serializer import BranchSerializer

class BranchListView(generics.ListAPIView):
    queryset = Branch.objects.all() 
    serializer_class = BranchSerializer
    permission_classes = [permissions.IsAuthenticated]

