from rest_framework import generics
from .models import Resources
from .serializer import ResourcesSerializer


class ResourcesListCreateView(generics.ListCreateAPIView):
    """
    View to list all resources or create a new resource.
    """
    queryset = Resources.objects.all()
    serializer_class = ResourcesSerializer


class ResourcesRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    View to retrieve, update, or delete a resource.
    """
    queryset = Resources.objects.all()
    serializer_class = ResourcesSerializer