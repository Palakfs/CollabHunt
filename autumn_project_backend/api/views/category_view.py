from rest_framework import generics , permissions
from api.models import Category
from api.serializers.category_serializer import CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class CategoryListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
