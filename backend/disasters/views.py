from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import DisasterSerializer, DisasterReportSerializer

class AddDisasterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = DisasterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DisasterReportCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = DisasterReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
