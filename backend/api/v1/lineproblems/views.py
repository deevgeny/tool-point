from rest_framework.viewsets import ModelViewSet

from qualityproblems.models import LineProblem

from . import serializers


class LineProblemViewSet(ModelViewSet):
    """LineProblem view set."""
    def get_queryset(self):
        if self.action == 'list':
            return (LineProblem.objects
                    .select_related('client', 'defect',
                                    'product', 'reported_by')
                    .order_by('id').all())
        return (LineProblem.objects
                .prefetch_related('process_actions', 'product_actions',
                                  'sample_actions', 'extra_actions',
                                  'extra_samples', 'containments',
                                  'countermeasures').all())

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.LineProblemListSerializer
        return serializers.LineProblemCreateRetrieveUpdateSerializer
