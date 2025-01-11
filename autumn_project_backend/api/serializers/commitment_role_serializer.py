from rest_framework import serializers
from api.models import Commitment_Role

class CommitmentRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commitment_Role
        fields = ['commitment_role', 'role_name']
        read_only_fields = ['commitment_role'] 
        

