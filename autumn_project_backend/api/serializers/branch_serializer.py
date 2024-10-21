from rest_framework import serializers
from api.models import Branch

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['branch', 'branch_name']
        read_only_fields = ['branch'] 
        