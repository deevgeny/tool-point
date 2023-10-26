from rest_framework.viewsets import ModelViewSet

from qualityproblems.models import ExtraAction

from .serializers import ExtraActionListSerializer, ExtraActionSerializer


class ExtraActionViewSet(ModelViewSet):
    """ExtraAction model view set."""
    queryset = ExtraAction.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ExtraActionListSerializer
        return ExtraActionSerializer
