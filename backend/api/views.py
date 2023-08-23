from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from filemanagement.models import CodeFile, LogFile
from .serializers import (
    CodeFileCreateSerializer,
    CodeFileSerializer,
    LogFileSerializer
)


class CodeFileViewSet(viewsets.ModelViewSet):
    queryset = CodeFile.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return CodeFileCreateSerializer
        else:
            return CodeFileSerializer
        
    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(author=user)


class LogFileViewSet(viewsets.ModelViewSet):
    queryset = LogFile.objects.all()
    serializer_class = LogFileSerializer

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)
    
    @action(detail=False, methods=['get'], url_path='by_file/(?P<id>[^/.]+)')
    def get_by_file_id(self, request, id=None):
        file = get_object_or_404(CodeFile, id=id)
        log = LogFile.objects.filter(file=file).last()
        serializer = self.get_serializer(log)
        return Response(serializer.data, status=status.HTTP_200_OK)
