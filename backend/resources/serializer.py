from rest_framework import serializers
from .models import Item, Category, Resources

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['name', 'quantity', 'description']

class CategorySerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True)

    class Meta:
        model = Category
        fields = ['name', 'items']

    def create(self, validated_data):
        # Handle the nested items creation
        items_data = validated_data.pop('items')
        category = Category.objects.create(**validated_data)
        for item_data in items_data:
            item = Item.objects.create(**item_data)
            category.items.add(item)
        return category

class ResourcesSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Resources
        fields = ['drop_off_location', 'pick_up_location', 'category']

    def create(self, validated_data):
        # Extract and handle category creation
        category_data = validated_data.pop('category')
        category_serializer = CategorySerializer(data=category_data)
        if category_serializer.is_valid(raise_exception=True):
            category = category_serializer.save()

        # Create Resources instance
        resources = Resources.objects.create(category=category, **validated_data)
        return resources
