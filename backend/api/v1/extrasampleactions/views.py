from rest_framework.viewsets import ModelViewSet

from qualityproblems.models import ExtraSampleAction

from .serializers import (
    ExtraSampleActionListSerializer,
    ExtraSampleActionSerializer,
)


class ExtraSampleActionViewSet(ModelViewSet):
    """ExtraSampleAction model view set."""
    def get_queryset(self):
        if self.action == 'list':
            return (ExtraSampleAction.objects
                    .select_related('responsible', 'requested_by')
                    .order_by('id').all())
        return ExtraSampleAction.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ExtraSampleActionListSerializer
        return ExtraSampleActionSerializer
