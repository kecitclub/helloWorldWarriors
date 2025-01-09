from django.db import models
# from users.models import Donor

class Category(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=0)


    def __str__(self):
        return self.name 

class Resources(models.Model):
    name = models.CharField(max_length= 100)
    description = models.CharField(max_length=200)
    categories = models.ForeignKey('Category', on_delete= models.CASCADE)
    drop_off_location= models.CharField(max_length=100, null=True)
    pick_up_location=models.CharField(max_length=100, null=True)


    def __str__(self):
        return self.name