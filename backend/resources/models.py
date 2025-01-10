from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)
    items = models.ManyToManyField(Item) 

    def __str__(self):
        return self.name

class Resources(models.Model):
    drop_off_location = models.CharField(max_length=100, blank=True)
    pick_up_location = models.CharField(max_length=100, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f"Resources at {self.drop_off_location} to {self.pick_up_location}"
