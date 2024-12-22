from rest_framework import generics, permissions
from api.models import Team , Event
from api.serializers.team_serializer import TeamSerializer
from rest_framework.response import Response
from rest_framework import status
from api.permissions.team_permissions import IsTeamAdmin
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

class TeamListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, event_id=None):
        if event_id:
            teams = Team.objects.filter(event_id=event_id)
        else:
            teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)

class TeamListCreateView(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        event_id = self.kwargs.get('event_id')
        event = get_object_or_404(Event, pk=event_id)  
        serializer.save(team_admin_id=self.request.user, event_id=event)

class TeamDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsTeamAdmin]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.event_admin != request.user:
            return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.event_admin != request.user:
            return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [IsTeamAdmin()]
    

