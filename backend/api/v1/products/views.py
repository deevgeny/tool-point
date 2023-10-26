from rest_framework.viewsets import ModelViewSet

from products.models import Product, ProductSpecification

from .serializers import ProductSerializer, ProductSpecificationSerializer


class ProductViewSet(ModelViewSet):
    """Product view set."""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductSpecificationViewSet(ModelViewSet):
    """Product specification view set."""
    queryset = ProductSpecification.objects.all()
    serializer_class = ProductSpecificationSerializer
