from rest_framework import viewsets

from filemanagement.models import CodeFile
from .serializers import CodeFileCreateSerializer, CodeFileSerializer


class CodeFileViewSet(viewsets.ModelViewSet):
    queryset = CodeFile.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return CodeFileCreateSerializer
        else:
            return CodeFileSerializer
