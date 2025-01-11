from django.db.models import Count
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Disaster, DisasterReport, ResourceRequest
from .serializers import DisasterSerializer, DisasterReportSerializer, ResourceRequestSerializer

class AddDisasterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = DisasterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DisasterListView(APIView):
    def get(self, request, *args, **kwargs):
        disasters = Disaster.objects.all() 
        serializer = DisasterSerializer(disasters, many=True)  
        return Response(serializer.data)  

class DisasterReportCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = DisasterReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DisasterReportListView(generics.ListAPIView):
    queryset = DisasterReport.objects.filter(disaster__isnull=False)
    serializer_class = DisasterReportSerializer
    
class ResourceRequestCreateView(generics.CreateAPIView):
    queryset = ResourceRequest.objects.all()
    serializer_class = ResourceRequestSerializer

    def perform_create(self, serializer):
        disaster_report_id = self.kwargs.get('disaster_report_id')
        
        try:
            disaster_report = DisasterReport.objects.get(id=disaster_report_id)
        except DisasterReport.DoesNotExist:
            raise Exception(detail="DisasterReport not found", code=status.HTTP_404_NOT_FOUND)

        serializer.save(disaster_report=disaster_report)
    
    def create(self, request, *args, **kwargs):
        disaster_report_id = self.kwargs.get('disaster_report_id')
        
        request.data['disaster_report'] = disaster_report_id

        return super().create(request, *args, **kwargs)
    
class DisasterReportCountView(APIView):
    def get(self, request, *args, **kwargs):
        disaster_report_counts = DisasterReport.objects.values('disaster__disaster_type') \
            .annotate(report_count=Count('id')) \
            .order_by('disaster__disaster_type') \
            .values('disaster__disaster_type', 'report_count')  # Rename 'disaster__disaster_type'

        disaster_report_counts = [
            {
                'disaster_type': item['disaster__disaster_type'],
                'report_count': item['report_count']
            }
            for item in disaster_report_counts
        ]
        
        return Response(disaster_report_counts, status=status.HTTP_200_OK)