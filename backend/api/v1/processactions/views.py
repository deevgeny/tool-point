from rest_framework.viewsets import ModelViewSet

from qualityproblems.models import ProcessAction

from .serializers import ProcessActionListSerializer, ProcessActionSerializer


class ProcessActionViewSet(ModelViewSet):
    """ProcessAction model view set."""
    queryset = ProcessAction.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ProcessActionListSerializer
        return ProcessActionSerializer
