from rest_framework import generics, permissions
from api.models import Joining_Request , Team
from api.serializers.joining_request_serializer import JoiningRequestSerializer
from rest_framework.response import Response
from rest_framework import status 
from api.permissions.request_permissions import IsRequestOwnerOrTeamAdmin
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.mixins import UpdateModelMixin



class RequestListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, team_id=None):
        if team_id:
            requests = Joining_Request.objects.filter(team_id=team_id)
        else:
            requests = Joining_Request.objects.all()
        serializer = JoiningRequestSerializer(requests, many=True)
        return Response(serializer.data)

class JoiningRequestListCreateView(generics.ListCreateAPIView):
    
    queryset = Joining_Request.objects.all()
    serializer_class = JoiningRequestSerializer

    def get_queryset(self):  
        user = self.request.user
        return Joining_Request.objects.filter(team_id__team_admin_id=user)

    def perform_create(self, serializer):
        team_id = self.kwargs.get('team_id')
        team = get_object_or_404(Team, pk=team_id)  
        serializer.save(sender_id=self.request.user, team_id=team)

class JoiningRequestDetailView(generics.RetrieveUpdateDestroyAPIView , UpdateModelMixin):
   
    queryset = Joining_Request.objects.all()
    serializer_class = JoiningRequestSerializer

    def patch(self, request, pk, *args, **kwargs):
        try:
            joining_request = Joining_Request.objects.get(pk=pk)
            is_reviewed = request.data.get('is_reviewed', False)
            is_accepted = request.data.get('is_accepted', False)

            if is_reviewed:
                if is_accepted:
                    team = joining_request.team_id
                    team.team_member_id.add(joining_request.sender_id)
                    team.save()
                
                joining_request.delete()
                return Response({'message': 'Request processed successfully'}, status=status.HTTP_200_OK)

            return Response({'detail': 'Request not reviewed'}, status=status.HTTP_400_BAD_REQUEST)
        except Joining_Request.DoesNotExist:
            return Response({'detail': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request, request_id, *args, **kwargs):
        try:
            joining_request = Joining_Request.objects.get(id=request_id)
            team = joining_request.team_id

            
            if joining_request.team_id.team_admin_id == request.user:
                if request.data.get('is_reviewed') == True : 
                    if request.data.get('is_accepted') == True :
                    
                        team.team_member_id.add(joining_request.sender_id)
                        team.save()

            
                    joining_request.delete()
                    return Response({'message': 'Request processed successfully'}, status=status.HTTP_200_OK)
                return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        except Joining_Request.DoesNotExist:
            return Response({'detail': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, *args, **kwargs):
       
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
       
        instance = self.get_object()

        if instance.sender_id == request.user or instance.team_id.team_admin == request.user:
            partial = kwargs.pop('partial', False)
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)

        return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
       
        instance = self.get_object()

        if instance.sender_id == request.user:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)
    
