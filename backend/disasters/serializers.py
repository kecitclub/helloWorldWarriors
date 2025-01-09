from rest_framework import serializers
from .models import Disaster, DisasterReport

class DisasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disaster
        fields = [
            'id',
            'disaster_type',
            'date_occurred',
            'latitude',
            'longitude',
            'magnitude',
            'is_active',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class DisasterReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisasterReport
        fields = [
            'id',
            'disaster',
            'description',
            'reporter_first_name',
            'reporter_last_name',
            'reporter_contact',
            'severity_level',
            'latitude',
            'longitude',
            'status',
            'reported_at'
        ]
        read_only_fields = ['id', 'reported_at']