from rest_framework.viewsets import ModelViewSet

from qualityproblems.models import ProductAction

from .serializers import ProductActionListSerializer, ProductActionSerializer


class ProductActionViewSet(ModelViewSet):
    """ProductAction model view set."""
    def get_queryset(self):
        if self.action == 'list':
            return (ProductAction.objects
                    .select_related('responsible', 'action')
                    .order_by('id').all())
        return ProductAction.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ProductActionListSerializer
        return ProductActionSerializer
