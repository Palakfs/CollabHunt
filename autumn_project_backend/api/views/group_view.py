from rest_framework import generics, permissions
from api.models import Group
from api.serializers.group_serializer import GroupSerializer
from rest_framework.response import Response
from rest_framework import status
from api.permissions.group_permissions import IsGroupAdmin
from rest_framework.views import APIView

class GroupListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user_profile = request.user.profile 
        groups = Group.objects.filter(member_id=user_profile)
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)


class GroupListCreateView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        group = serializer.save(group_admin=self.request.user)
        group.member_id.add(self.request.user.profile)

class GroupDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsGroupAdmin]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.group_admin != request.user:
            return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.group_admin != request.user:
            return Response({'detail': 'No Permission Access'}, status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [IsGroupAdmin()]
    

