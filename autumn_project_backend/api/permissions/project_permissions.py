from rest_framework import permissions
class IsProjectOwner(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        return obj.profile == request.user.profile
