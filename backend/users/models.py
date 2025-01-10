from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from .manager import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, null=True)
    first_name=models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255, )
    last_name=models.CharField(max_length=255)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    is_superuser = models.BooleanField(default = False) 
    date_joined=models.DateTimeField(default=timezone.now)
    is_volunteer = models.BooleanField(default = False) 

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["phone_number", "first_name", "last_name"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class Volunteer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, primary_key=True, on_delete=models.CASCADE, related_name="volunteer")
    address = models.CharField(max_length=100)
    occupation = models.CharField(max_length=100)
    volunteering_area = models.JSONField(default=list)
    response_radius = models.PositiveIntegerField(default=20)
    days_available = models.JSONField(default=list)
    time_preferences = models.JSONField(default=dict, blank=True, null=True)
    is_part_time = models.BooleanField(default=False)
    emergency_contact_name = models.CharField(max_length = 100)
    emergency_contact_no = models.CharField(max_length=15)
    is_available = models.BooleanField(default=True)

    def _str_(self):
        return f"{self.user.first_name} {self.user.last_name}"

@receiver(post_save, sender=Volunteer)
def set_user_as_volunteer(sender, instance, created, **kwargs):
    if created:
        user = instance.user
        user.is_volunteer = True
        user.save(update_fields=['is_volunteer'])