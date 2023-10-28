from rest_framework.viewsets import ModelViewSet

from qualityproblems.models import Containment

from .serializers import ContainmentListSerializer, ContainmentSerializer


class ContainmentViewSet(ModelViewSet):
    """Containment model view set."""

    def get_queryset(self):
        if self.action == 'list':
            return (Containment.objects
                    .select_related('responsible')
                    .order_by('id').all())
        return Containment.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ContainmentListSerializer
        return ContainmentSerializer
