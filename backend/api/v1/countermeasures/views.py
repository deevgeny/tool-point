from rest_framework.viewsets import ModelViewSet

from qualityproblems.models import Countermeasure

from .serializers import CountermeasureListSerializer, CountermeasureSerializer


class CountermeasureViewSet(ModelViewSet):
    """Countemeasure model view set."""
    def get_queryset(self):
        if self.action == 'list':
            return (Countermeasure.objects
                    .select_related('responsible')
                    .order_by('id').all())
        return Countermeasure.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return CountermeasureListSerializer
        return CountermeasureSerializer
