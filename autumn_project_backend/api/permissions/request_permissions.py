from rest_framework import permissions
class IsRequestOwnerOrTeamAdmin(permissions.BasePermission):
   
    def has_object_permission(self, request, view, obj):
        return obj.person_expertise_id.person == request.user or obj.team_id.team_admin == request.user