from rest_framework.viewsets import ModelViewSet

from qualityproblems.models import LineProblem

from . import serializers


class LineProblemViewSet(ModelViewSet):
    """LineProblem view set."""
    queryset = LineProblem.objects.select_related(
        'client', 'defect', 'product', 'reported_by', 'edited_by'
    ).all()

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.LineProblemListSerializer
        return serializers.LineProblemCreateRetrieveUpdateSerializer
