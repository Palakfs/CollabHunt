from rest_framework import serializers
from api.models import Experience

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['experience', 'experience_title', 'experience_description', 'profile']
        
