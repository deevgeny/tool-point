from rest_framework.viewsets import ModelViewSet

from qualityproblems.models import SampleAction

from .serializers import SampleActionListSerializer, SampleActionSerializer


class SampleActionViewSet(ModelViewSet):
    """SampleAction model view set."""
    def get_queryset(self):
        if self.action == 'list':
            return (SampleAction.objects
                    .select_related('responsible', 'action')
                    .order_by('id').all())
        return SampleAction.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return SampleActionListSerializer
        return SampleActionSerializer
