from rest_framework import serializers

from products.models import Product, ProductSpecification


class ProductSpecificationSerializer(serializers.ModelSerializer):
    """Product specification model serializer."""
    class Meta:
        model = ProductSpecification
        fields = [
            'product', 'density', 'solid_content', 'ph', 'acid_meq',
            'base_meq', 'solvent_content', 'conductivity', 'hegman_fineness',
            'viscosity', 'thickness', 'gloss', 'adhesion', 'roughness',
            'resistivity', 'hiding_power'
        ]


class ProductSerializer(serializers.ModelSerializer):
    """Product model serializer."""
    specification = ProductSpecificationSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'code', 'name', 'specification']
