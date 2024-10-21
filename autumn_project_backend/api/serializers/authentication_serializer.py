from rest_framework import serializers
from api.models import CustomUser


class AuthenticationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['user_enrol']
        
