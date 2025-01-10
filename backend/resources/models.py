from django.db import models


class Resources(models.Model):
    drop_off_location = models.CharField(max_length=100, blank=True)
    pick_up_location = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Resources at {self.drop_off_location} to {self.pick_up_location}"
    

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
    
class Item(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    description = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE) 
    resources = models.ForeignKey(Resources, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    



