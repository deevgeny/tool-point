from rest_framework.viewsets import ModelViewSet

from qualityproblems.models import ProductAction

from .serializers import ProductActionListSerializer, ProductActionSerializer


class ProductActionViewSet(ModelViewSet):
    """ProductAction model view set."""
    queryset = ProductAction.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ProductActionListSerializer
        return ProductActionSerializer
