from django.shortcuts import get_object_or_404
from rest_framework import serializers

from products.models import ProductSpecification
from specifications.models import (
    AcidMeq,
    Adhesion,
    BaseMeq,
    Conductivity,
    Density,
    Gloss,
    HegmanFineness,
    HidingPower,
    Method,
    Ph,
    Resistivity,
    Roughness,
    SolidContent,
    SolventContent,
    Thickness,
    Uom,
    Viscosity,
)

from api_v1.exceptions import AlreadyExistsException


class UomSerializer(serializers.ModelSerializer):
    """Uom serializer."""
    class Meta:
        model = Uom
        fields = ['id', 'name', 'description']


class MethodSerializer(serializers.ModelSerializer):
    """Method serializer."""
    class Meta:
        model = Method
        fields = ['id', 'name']


class DensitySerializer(serializers.ModelSerializer):
    """Density serializer."""
    class Meta:
        model = Density
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateDensitySerializer(serializers.ModelSerializer):
    """Density serializer for POST request."""
    class Meta:
        model = Density
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.density is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(density=obj)
        return obj


class SolidContentSerializer(serializers.ModelSerializer):
    """SolidContent serializer."""
    class Meta:
        model = SolidContent
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateSolidContentSerializer(serializers.ModelSerializer):
    """SolidContent serializer for POST request."""
    class Meta:
        model = SolidContent
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.solid_content is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(solid_content=obj)
        return obj


class PhSerializer(serializers.ModelSerializer):
    """Ph serializer."""
    class Meta:
        model = Ph
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreatePhSerializer(serializers.ModelSerializer):
    """Ph serializer for POST request."""
    class Meta:
        model = Ph
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.ph is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(ph=obj)
        return obj


class AcidMeqSerializer(serializers.ModelSerializer):
    """AcidMeq serializer."""
    class Meta:
        model = AcidMeq
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateAcidMeqSerializer(serializers.ModelSerializer):
    """AcidMeq serializer for POST request."""
    class Meta:
        model = AcidMeq
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.acid_meq is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(acid_meq=obj)
        return obj


class BaseMeqSerializer(serializers.ModelSerializer):
    """BaseMeq serializer."""
    class Meta:
        model = BaseMeq
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateBaseMeqSerializer(serializers.ModelSerializer):
    """BaseMeq serializer for POST request."""
    class Meta:
        model = BaseMeq
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.base_meq is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(base_meq=obj)
        return obj


class SolventContentSerializer(serializers.ModelSerializer):
    """SolventContent serializer."""
    class Meta:
        model = SolventContent
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateSolventContentSerializer(serializers.ModelSerializer):
    """SolventContent serializer for POST request."""
    class Meta:
        model = SolventContent
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.solvent_content is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(solvent_content=obj)
        return obj


class ConductivitySerializer(serializers.ModelSerializer):
    """Conductivity serializer."""
    class Meta:
        model = Conductivity
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateConductivitySerializer(serializers.ModelSerializer):
    """Conductivity serializer for POST request."""
    class Meta:
        model = Conductivity
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.conductivity is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(conductivity=obj)
        return obj


class HegmanFinenessSerializer(serializers.ModelSerializer):
    """HegmanFineness serializer."""
    class Meta:
        model = HegmanFineness
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateHegmanFinenessSerializer(serializers.ModelSerializer):
    """HegmanFineness serializer for POST request."""
    class Meta:
        model = HegmanFineness
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.hegman_fineness is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(hegman_fineness=obj)
        return obj


class ViscositySerializer(serializers.ModelSerializer):
    """Viscosity serializer."""
    class Meta:
        model = Viscosity
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateViscositySerializer(serializers.ModelSerializer):
    """Viscosity serializer for POST request."""
    class Meta:
        model = Viscosity
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.viscosity is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(viscosity=obj)
        return obj


class ThicknessSerializer(serializers.ModelSerializer):
    """Thickness serializer."""
    class Meta:
        model = Thickness
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateThicknessSerializer(serializers.ModelSerializer):
    """Thickness serializer for POST request."""
    class Meta:
        model = Thickness
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.thickness is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(thickness=obj)
        return obj


class GlossSerializer(serializers.ModelSerializer):
    """Gloss serializer."""
    class Meta:
        model = Gloss
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateGlossSerializer(serializers.ModelSerializer):
    """Gloss serializer for POST request."""
    class Meta:
        model = Gloss
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.gloss is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(gloss=obj)
        return obj


class AdhesionSerializer(serializers.ModelSerializer):
    """Adhesion serializer."""
    class Meta:
        model = Adhesion
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateAdhesionSerializer(serializers.ModelSerializer):
    """Adhesion serializer for POST request."""
    class Meta:
        model = Adhesion
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.adhesion is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(adhesion=obj)
        return obj


class RoughnessSerializer(serializers.ModelSerializer):
    """Roughness serializer."""
    class Meta:
        model = Roughness
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateRoughnessSerializer(serializers.ModelSerializer):
    """Roughness serializer for POST request."""
    class Meta:
        model = Roughness
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.roughness is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(roughness=obj)
        return obj


class ResistivitySerializer(serializers.ModelSerializer):
    """Resistivity serializer."""
    class Meta:
        model = Resistivity
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateResistivitySerializer(serializers.ModelSerializer):
    """Resistivity serializer for POST request."""
    class Meta:
        model = Resistivity
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.resistivity is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(resistivity=obj)
        return obj


class HidingPowerSerializer(serializers.ModelSerializer):
    """Hiding power serializer."""
    class Meta:
        model = HidingPower
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value']


class CreateHidingPowerSerializer(serializers.ModelSerializer):
    """Hiding power serializer for POST request."""
    class Meta:
        model = HidingPower
        fields = ['id', 'method', 'uom', 'condition', 'min_value', 'max_value',
                  'product_spec']

    def create(self, validated_data):
        id = validated_data.pop('product_spec')
        product_spec = get_object_or_404(ProductSpecification, pk=id)
        if product_spec.hiding_power is not None:
            raise AlreadyExistsException()
        obj = self.Meta.model.objects.create(**validated_data)
        ProductSpecification.objects.filter(pk=id).update(hiding_power=obj)
        return obj
