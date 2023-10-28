from rest_framework.viewsets import ModelViewSet

from qualityproblems.models import ProcessAction

from .serializers import ProcessActionListSerializer, ProcessActionSerializer


class ProcessActionViewSet(ModelViewSet):
    """ProcessAction model view set."""
    def get_queryset(self):
        if self.action == 'list':
            return (ProcessAction.objects
                    .select_related('responsible', 'action')
                    .order_by('id').all())
        return ProcessAction.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ProcessActionListSerializer
        return ProcessActionSerializer
