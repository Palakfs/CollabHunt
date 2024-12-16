from rest_framework import serializers
from api.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = ['username', 'email', 'full_name', 'contact_number', 'skills']
        
        