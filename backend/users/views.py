from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserCreateSerializer, VolunteerSignUpSerializer

class UserCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"message": "User created successfully", "user": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VolunteerCreateView(APIView):
    def post(self, request):
        serializer = VolunteerSignUpSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Volunteer profile created successfully.", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)