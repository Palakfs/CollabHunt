from rest_framework import generics , permissions
from api.models import Category
from api.serializers.category_serializer import CategorySerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
