from rest_framework import serializers
from api.models import Team

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['team', 'event_id', 'team_admin_id', 'team_member_id', 'team_theme_goals', 'expectations', 'max_members', 'admin_expertise_id']
        
