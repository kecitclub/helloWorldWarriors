from rest_framework import serializers
from .models import Resources, Category, Item


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']


class ItemSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Item
        fields = ['name', 'quantity', 'description', 'category']

    def create(self, validated_data):
        # Handle nested category creation
        category_data = validated_data.pop('category')
        category, _ = Category.objects.get_or_create(**category_data)
        return Item.objects.create(category=category, **validated_data)


class ResourcesSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, source='item_set')

    class Meta:
        model = Resources
        fields = ['drop_off_location', 'pick_up_location', 'items']

    def create(self, validated_data):
        # Extract and handle items
        items_data = validated_data.pop('item_set', [])
        resources = Resources.objects.create(**validated_data)

        for item_data in items_data:
            category_data = item_data.pop('category')
            category, _ = Category.objects.get_or_create(**category_data)
            Item.objects.create(resources=resources, category=category, **item_data)

        return resources
