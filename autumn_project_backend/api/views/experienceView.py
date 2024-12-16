from rest_framework import generics, permissions
from api.models import Experience
from api.serializers.experience_serializer import ExperienceSerializer
from rest_framework.response import Response
from rest_framework import status
from api.permissions.experience_permissions import IsExperienceOwner

class ExperienceListCreateView(generics.ListCreateAPIView):
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        
        return Experience.objects.filter(profile=self.request.user.profile)

    def perform_create(self, serializer):
       
        serializer.save(profile=self.request.user.profile)

class ExperienceDetailView(generics.RetrieveUpdateDestroyAPIView):
   
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsExperienceOwner]

    def retrieve(self, request, *args, **kwargs):
      
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        
        instance = self.get_object()

        if instance.profile != request.user.profile:
            return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
      
        instance = self.get_object()

        if instance.profile != request.user.profile:
            return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
