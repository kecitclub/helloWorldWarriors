from django.urls import path
from .views import ResourcesListCreateView, ResourcesDetailView, CategoryListCreateView

urlpatterns = [
    path('resources/', ResourcesListCreateView.as_view(), name='resources-list-create'),
    path('resources/<int:pk>/', ResourcesDetailView.as_view(), name='resources-detail'),
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
]
