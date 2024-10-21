from rest_framework import serializers
from api.models import Joining_Request

class JoiningRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Joining_Request
        fields = ['request', 'team_id', 'person_expertise_id', 'is_accepted']
        
