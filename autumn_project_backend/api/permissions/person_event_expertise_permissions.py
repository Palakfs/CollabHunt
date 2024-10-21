from rest_framework import permissions
from api.models import Joining_Request, Team

class IsCreator(permissions.BasePermission):
   
    def has_object_permission(self, request, view, obj):
        return obj.person == request.user
    
class IsRequestTeamAdmin(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
          if Team.objects.filter(team_admin_id=request.user, joining_request__person_expertise_id=obj).exists():
            return True

          return False

            