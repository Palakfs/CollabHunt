from rest_framework import serializers
from api.models import Team

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['team','team_member_id', 'team_name','team_description', 'expectations', 'max_members', 'admin_expertise','commitment_role_id']
        read_only_fields = ['team_admin_id', 'event_id']
        extra_kwargs = {
            'team_member_id': {'required': False},  
        }

        def validate_team_member_id(self, value):
            if value is None:
                return []
            return value

        def create(self, validated_data):
            request = self.context.get('request')
            team_admin = request.user
            team = super().create(validated_data)
            return team