from rest_framework import serializers
from api.models import Joining_Request

class JoiningRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Joining_Request
        fields = ['joining_request', 'team_id', 'sender_id', 'is_accepted','is_reviewed']
        read_only_fields = ['team_id','sender_id']

        def create(self, validated_data):
            request = self.context.get('request')
            sender_id = request.user
            joining_Request = super().create(validated_data)
            return joining_Request