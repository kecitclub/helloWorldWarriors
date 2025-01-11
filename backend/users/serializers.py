from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import transaction
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import User, Volunteer

User=get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'phone_number', 'first_name', 'middle_name', 'last_name', 'is_volunteer', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_volunteer': {'required': False, 'default': False},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class VolunteerSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ['address', 'response_radius', 'days_available', 'occupation', 'volunteering_area','time_preferences', 'is_part_time', 'emergency_contact_name', 'emergency_contact_no', 'is_available']

    def create(self, validated_data):
        user = self.context['request'].user

        if user:
            if Volunteer.objects.filter(user=user).exists():
                raise serializers.ValidationError("A volunteer account with this user is already in use.")

            volunteer = Volunteer.objects.create(user=user, **validated_data)
            return volunteer
        else:
            raise serializers.ValidationError("User details not provided.")