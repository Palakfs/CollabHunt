from rest_framework import serializers
from api.models import Person_Event_Expertise

class PersonEventExpertiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person_Event_Expertise
        fields = ['expertise', 'event_id', 'person_username', 'commitment_role_id', 'event_expertise']
        
