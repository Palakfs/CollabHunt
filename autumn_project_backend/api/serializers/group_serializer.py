from rest_framework import serializers
from api.models import Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['group', 'group_name', 'group_description', 'group_admin', 'member_id']
        read_only_fields = ['group_admin'] 
        
        def create(self, validated_data):
            request = self.context.get('request')
            validated_data['group_admin'] = request.user  
            return super().create(validated_data)