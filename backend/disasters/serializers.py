from rest_framework import serializers
from .models import Disaster, DisasterReport, ResourceRequest

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
            'reported_at',
            'resource_required'
        ]
        read_only_fields = ['id', 'reported_at']

class ResourceRequestSerializer(serializers.ModelSerializer):
    disaster_report = serializers.PrimaryKeyRelatedField(queryset=DisasterReport.objects.all())

    class Meta:
        model = ResourceRequest
        fields = ['id', 'disaster_report', 'requires_volunteer', 'volunteers_type', 'urgency_level', 'resources_needed']

class DisasterReportCountSerializer(serializers.Serializer):
    disaster_type = serializers.CharField()
    report_count = serializers.IntegerField()