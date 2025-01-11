from rest_framework import permissions
class IsGroupAdmin(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        return obj.group_admin == request.user