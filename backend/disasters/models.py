from django.db import models
from django.utils import timezone

class DisasterType(models.TextChoices):
    FLOOD = "Flood", "Flood"
    EARTHQUAKE = "Earthquake", "Earthquake"
    FIRE = "Fire", "Fire"
    LANDSLIDE = "Landslide", "Landslide"
    OTHER = "Other", "Other"

class Severity(models.TextChoices):
    LOW = "Low", "Low"
    MODERATE = "Moderate", "Moderate"
    HIGH = "High", "High"
    CRITICAL = "Critical", "Critical"

class Disaster(models.Model):
    disaster_type = models.CharField(
        max_length = 100,
        choices = DisasterType.choices
    )
    date_occurred = models.DateField(default=timezone.now)
    latitude = models.FloatField()
    longitude = models.FloatField()
    magnitude = models.FloatField(null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.disaster_type()} at {self.location}"

    class Meta:
        ordering = ["-date_occurred"]

class DisasterReport(models.Model):
    disaster = models.ForeignKey(
        Disaster,
        on_delete=models.SET_NULL,
        null=True, 
        blank=True,
        related_name="disaster_report"
    )
    description = models.TextField()
    reporter_first_name = models.CharField(max_length=255)
    reporter_last_name = models.CharField(max_length=255)
    reporter_contact = models.CharField(max_length=50)
    severity_level = models.CharField(
        max_length=20,
        choices=Severity.choices,
        default="Low",
    )    
    latitude = models.FloatField()
    longitude = models.FloatField()
    reported_at = models.DateTimeField(auto_now_add=True)
    resource_required = models.BooleanField(default=False)
    def __str__(self):
        return f"Report by {self.reporter_first_name} {self.reporter_last_name} on {self.reported_at}"

    class Meta:
        ordering = ["-reported_at"]

class ResourceRequest(models.Model):
    disaster_report = models.OneToOneField(
        DisasterReport,
        on_delete=models.CASCADE,
        related_name="resource_request"
    )
    requires_volunteer = models.BooleanField(default=False) 
    volunteers_type = models.JSONField(null=True, blank=True)
    urgency_level = models.CharField(
        max_length=20,
        choices=Severity.choices,
        default="Medium",
    )
    resources_needed = models.JSONField()

    def __str__(self):
        return f"Resource Request for Disaster Report {self.disaster_report.id}"


