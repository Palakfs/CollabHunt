from rest_framework import generics, permissions
from api.models import Event
from api.serializers.event_serializer import EventSerializer
from rest_framework.response import Response
from rest_framework import status                                                  
from api.permissions.event_permissions import IsEventAdmin
from rest_framework.views import APIView


class EventListView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    

    def get(self, request):
        user_profile = request.user.profile
        events = Event.objects.filter(visible_to_group_id__member_id=user_profile)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(event_admin=self.request.user)

class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [IsEventAdmin()]
    

