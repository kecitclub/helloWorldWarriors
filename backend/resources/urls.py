from django.urls import path
from .views import ResourcesListCreate, ResourcesRetrieveUpdateDestroy

urlpatterns = [
    path('resources/', ResourcesListCreate.as_view(), name='resources-list-create'),
    path('resources/<int:pk>/', ResourcesRetrieveUpdateDestroy.as_view(), name='resources-detail'),
]
