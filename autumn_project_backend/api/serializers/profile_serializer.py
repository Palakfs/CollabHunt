from rest_framework import serializers
from api.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    avatar_url = serializers.ImageField(required=False)  
    
    class Meta:
        model = Profile
        fields = ['username', 'email', 'full_name', 'contact_number', 'skills','avatar_url']
        
        