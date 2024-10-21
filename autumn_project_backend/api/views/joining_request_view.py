from rest_framework import generics, permissions
from api.models import Joining_Request
from api.serializers.joining_request_serializer import JoiningRequestSerializer
from rest_framework.response import Response
from rest_framework import status
from api.permissions.request_permissions import IsRequestOwnerOrTeamAdmin

class JoiningRequestListCreateView(generics.ListCreateAPIView):
    
    queryset = Joining_Request.objects.all()
    serializer_class = JoiningRequestSerializer

    def get_queryset(self):  
        user = self.request.user
        return Joining_Request.objects.filter(team_id__team_admin_id=user)

    def perform_create(self, serializer):
       
        serializer.save(person_expertise_id=self.request.user.person_expertise)  

class JoiningRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
   
    queryset = Joining_Request.objects.all()
    serializer_class = JoiningRequestSerializer
    permission_classes = [IsRequestOwnerOrTeamAdmin]

    def retrieve(self, request, *args, **kwargs):
       
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
       
        instance = self.get_object()

        if instance.person_expertise_id.person == request.user or instance.team_id.team_admin == request.user:
            partial = kwargs.pop('partial', False)
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)

        return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
       
        instance = self.get_object()

        if instance.person_expertise_id.person == request.user:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)
    
