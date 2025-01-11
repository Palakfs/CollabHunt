from rest_framework import serializers
from api.models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['project', 'project_title', 'project_description', 'start_date', 'end_date', 'attachments_url', 'field', 'profile']
        
        extra_kwargs = {'attachments_url': {'required': False}}

    def validate_attachments_url(self, value):
        if value and not value.name.endswith(('.jpg', '.jpeg', '.png')):
            raise serializers.ValidationError("Only JPG, JPEG, and PNG files are supported.")
        return value