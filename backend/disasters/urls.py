from django.urls import path
from .views import *

urlpatterns = [
    path('', DisasterListView.as_view(), name='all-disasters'),
    path('add/', AddDisasterView.as_view(), name='add-disaster'),
    path('report-disaster/', DisasterReportCreateView.as_view(), name='create-disaster-report'),
    path('request-resource/<int:disaster_report_id>/', ResourceRequestCreateView.as_view(), name='request-resource'),
    path('reports/', DisasterReportListView.as_view(), name='reports-list'),
    path('reports/count/', DisasterReportCountView.as_view(), name='disaster-report-count')
]
