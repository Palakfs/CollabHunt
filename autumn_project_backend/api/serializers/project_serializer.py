from rest_framework import serializers
from api.models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['project', 'project_title', 'project_description', 'start_date', 'end_date', 'attachments_url', 'field', 'profile']
        
