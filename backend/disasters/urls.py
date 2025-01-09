from django.urls import path
from .views import AddDisasterView, DisasterReportCreateView

urlpatterns = [
    path('add/', AddDisasterView.as_view(), name='add-disaster'),
    path('report/', DisasterReportCreateView.as_view(), name='create-disaster-report'),
]
