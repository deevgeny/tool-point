from rest_framework.viewsets import ModelViewSet

from qualityproblems.models import ExtraSampleAction

from .serializers import (
    ExtraSampleActionListSerializer,
    ExtraSampleActionSerializer,
)


class ExtraSampleActionViewSet(ModelViewSet):
    """ExtraSampleAction model view set."""
    queryset = ExtraSampleAction.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ExtraSampleActionListSerializer
        return ExtraSampleActionSerializer
