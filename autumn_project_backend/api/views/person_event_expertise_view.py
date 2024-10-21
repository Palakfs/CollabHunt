from rest_framework import generics, permissions
from api.models import Person_Event_Expertise , Joining_Request
from api.serializers.person_event_expertise_serializer import PersonEventExpertiseSerializer
from rest_framework.response import Response
from rest_framework import status
from api.permissions.person_event_expertise_permissions import IsCreator , IsRequestTeamAdmin
from django.db.models import Q 

class PersonEventExpertiseListCreateView(generics.ListCreateAPIView):
   
    queryset = Person_Event_Expertise.objects.all()
    serializer_class = PersonEventExpertiseSerializer

    def perform_create(self, serializer):
        serializer.save(person=self.request.user)

class PersonEventExpertiseDetailView(generics.RetrieveUpdateDestroyAPIView):
   
    queryset = Person_Event_Expertise.objects.all()
    serializer_class = PersonEventExpertiseSerializer
    permission_classes = [permissions.IsAuthenticated, IsCreator, IsRequestTeamAdmin]

    def get_queryset(self):
        user = self.request.user
        return Person_Event_Expertise.objects.filter(
            Q(person_username=user) | 
            Q(event_id__team__team_admin_id=user)
        )

    def retrieve(self, request, *args, **kwargs):
        
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        
        instance = self.get_object()

        if instance.person != request.user:
            return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)

        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        
        instance = self.get_object()

        if instance.person != request.user:
            return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
