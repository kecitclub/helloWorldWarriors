from django.urls import path
from . views import *

urlpatterns = [
    path('volunteer/register/', VolunteerCreateView.as_view(), name='volunteer-register'),
]