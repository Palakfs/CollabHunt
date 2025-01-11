from rest_framework import permissions

class IsEventAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.event_admin == request.user
