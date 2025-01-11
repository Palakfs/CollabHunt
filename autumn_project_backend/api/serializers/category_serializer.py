from rest_framework import serializers
from api.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category', 'category_name']
        read_only_fields = ['category']
        