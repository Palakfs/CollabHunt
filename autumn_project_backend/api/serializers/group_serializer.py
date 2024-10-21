from rest_framework import serializers
from api.models import Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['group', 'group_name', 'group_description', 'admin_id', 'member_id']
        
