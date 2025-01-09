from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Resources, Category
from .serializer import ResourcesSerializer, CategorySerializer

# List and Create Resources
class ResourcesListCreateView(generics.ListCreateAPIView):
    queryset = Resources.objects.all()
    serializer_class = ResourcesSerializer

    def perform_create(self, serializer):
        serializer.save()

# List and Create Categories
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Retrieve, Update, and Delete a Resource
class ResourcesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resources.objects.all()
    serializer_class = ResourcesSerializer
