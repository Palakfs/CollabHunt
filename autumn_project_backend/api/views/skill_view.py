from rest_framework import generics, permissions
from api.models import Skill
from api.serializers.skill_serializer import SkillSerializer
from rest_framework.response import Response
from rest_framework import status
from api.permissions.skill_permissions import IsSkillOwner

class SkillListCreateView(generics.ListCreateAPIView):
 
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    def perform_create(self, serializer):
       
        serializer.save(owner=self.request.user)

class SkillDetailView(generics.RetrieveUpdateDestroyAPIView):
   
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsSkillOwner]

    def retrieve(self, request, *args, **kwargs):
      
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        
        instance = self.get_object()

        if instance.owner != request.user:
            return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
      
        instance = self.get_object()

        if instance.owner != request.user:
            return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
