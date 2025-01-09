from rest_framework import serializers
from .models import Resources, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'quantity']

class ResourcesSerializer(serializers.ModelSerializer):
    categories = CategorySerializer()  # Allows writable nested fields for creating/updating categories

    class Meta:
        model = Resources
        fields = ['id', 'name', 'description', 'categories', 'drop_off_location', 'pick_up_location']

    def create(self, validated_data):
        # Extract the nested category data
        category_data = validated_data.pop('categories')
        
        # Create or update the Category instance
        category, _ = Category.objects.get_or_create(**category_data)
        
        # Create the Resources instance
        resource = Resources.objects.create(categories=category, **validated_data)
        return resource

    def update(self, instance, validated_data):
        # Extract the nested category data
        category_data = validated_data.pop('categories', None)
        
        # Update the Category instance if needed
        if category_data:
            category, _ = Category.objects.update_or_create(
                id=instance.categories.id,
                defaults=category_data
            )
            instance.categories = category
        
        # Update the Resources instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
