from rest_framework import serializers
from api.models import CustomUser


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['user_enrol', 'password']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            user_enrol=validated_data['user_enrol'],
            password=validated_data['password']
        )
        return user
    
