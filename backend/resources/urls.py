from django.urls import path
from .views import ResourcesListCreateView, ResourcesRetrieveUpdateDestroyView

urlpatterns = [
    path('resources/', ResourcesListCreateView.as_view(), name='resources-list-create'),
    path('resources/<int:pk>/', ResourcesRetrieveUpdateDestroyView.as_view(), name='resources-detail'),
]
