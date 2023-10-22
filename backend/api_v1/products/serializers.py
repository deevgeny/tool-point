from rest_framework import serializers

from products.models import Product, ProductSpecification

from api_v1.specifications import serializers as spec_serializers


class ProductSpecificationSerializer(serializers.ModelSerializer):
    """Product specification model serializer."""
    density = spec_serializers.DensitySerializer()
    solid_content = spec_serializers.SolidContentSerializer()
    ph = spec_serializers.PhSerializer()
    acid_meq = spec_serializers.AcidMeqSerializer()
    base_meq = spec_serializers.BaseMeqSerializer()
    solid_content = spec_serializers.SolventContentSerializer()
    conductivity = spec_serializers.ConductivitySerializer()
    hegman_fineness = spec_serializers.HegmanFinenessSerializer()
    viscosity = spec_serializers.ViscositySerializer()
    thickness = spec_serializers.ThicknessSerializer()
    gloss = spec_serializers.GlossSerializer()
    adhesion = spec_serializers.AdhesionSerializer()
    roughness = spec_serializers.RoughnessSerializer()
    resistivity = spec_serializers.ResistivitySerializer()
    hiding_power = spec_serializers.HidingPowerSerializer()

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
