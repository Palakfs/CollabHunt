from rest_framework import permissions
from api.models import Team

class IsTeamAdmin(permissions.BasePermission):

    def has_permission(self, request, view):
      
        team_id = view.kwargs.get('team_id')
     
        try:
            team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return False

        return team.team_admin_id == request.user
