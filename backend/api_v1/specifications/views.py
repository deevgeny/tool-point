from django.db.models.deletion import ProtectedError
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet, ModelViewSet

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

from . import serializers
from api_v1.exceptions import ProtectedErrorException


class SpecDestroyModelMixin(mixins.DestroyModelMixin):
    """Customized destroy model mixin for Specification model."""
    def perform_destroy(self, instance):
        if hasattr(instance, 'product_spec'):
            raise ProtectedErrorException()
        return super().perform_destroy(instance)


class SpecModelViewSet(SpecDestroyModelMixin, mixins.CreateModelMixin,
                       mixins.ListModelMixin, mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin, GenericViewSet):
    """Customized ModelViewSet for Specifications model."""
    pass


class UomViewSet(ModelViewSet):
    """Uom view set."""
    queryset = Uom.objects.all()
    serializer_class = serializers.UomSerializer

    def perform_destroy(self, instance):
        try:
            super().perform_destroy(instance)
        except ProtectedError:
            raise ProtectedErrorException()


class MethodViewSet(ModelViewSet):
    """Method view set."""
    queryset = Method.objects.all()
    serializer_class = serializers.MethodSerializer

    def perform_destroy(self, instance):
        try:
            super().perform_destroy(instance)
        except ProtectedError:
            raise ProtectedErrorException()


class DensityViewSet(SpecModelViewSet):
    """Density specification view set."""
    queryset = Density.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateDensitySerializer
        return serializers.DensitySerializer


class SolidContentViewSet(SpecModelViewSet):
    """Solid content specification view set."""
    queryset = SolidContent.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateSolidContentSerializer
        return serializers.SolidContentSerializer


class PhViewSet(SpecModelViewSet):
    """Ph specification view set."""
    queryset = Ph.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreatePhSerializer
        return serializers.PhSerializer


class AcidMeqViewSet(SpecModelViewSet):
    """AcidMeq specification view set."""
    queryset = AcidMeq.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateAcidMeqSerializer
        return serializers.AcidMeqSerializer


class BaseMeqViewSet(SpecModelViewSet):
    """BaseMeq specification view set."""
    queryset = BaseMeq.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateBaseMeqSerializer
        return serializers.BaseMeqSerializer


class SolventContentViewSet(SpecModelViewSet):
    """SolventContent specification view set."""
    queryset = SolventContent.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateSolventContentSerializer
        return serializers.SolventContentSerializer


class ConductivityViewSet(SpecModelViewSet):
    """Conductivity specification view set."""
    queryset = Conductivity.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateConductivitySerializer
        return serializers.ConductivitySerializer


class HegmanFinenessViewSet(SpecModelViewSet):
    """HegmanFineness specification view set."""
    queryset = HegmanFineness.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateHegmanFinenessSerializer
        return serializers.HegmanFinenessSerializer


class ViscosityViewSet(SpecModelViewSet):
    """Viscosity specification view set."""
    queryset = Viscosity.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateViscositySerializer
        return serializers.ViscositySerializer


class ThicknessViewSet(SpecModelViewSet):
    """Thickness specification view set."""
    queryset = Thickness.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateThicknessSerializer
        return serializers.ThicknessSerializer


class GlossViewSet(SpecModelViewSet):
    """Gloss specification view set."""
    queryset = Gloss.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateGlossSerializer
        return serializers.GlossSerializer


class AdhesionViewSet(SpecModelViewSet):
    """Adhesion specification view set."""
    queryset = Adhesion.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateAdhesionSerializer
        return serializers.AdhesionSerializer


class RoughnessViewSet(SpecModelViewSet):
    """Roughness specification view set."""
    queryset = Roughness.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateRoughnessSerializer
        return serializers.RoughnessSerializer


class ResistivityViewSet(SpecModelViewSet):
    """Resistivity specification view set."""
    queryset = Resistivity.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateResistivitySerializer
        return serializers.ResistivitySerializer


class HidingPowerViewSet(SpecModelViewSet):
    """Hiding power specification view set."""
    queryset = HidingPower.objects.select_related('product_spec').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateHidingPowerSerializer
        return serializers.HidingPowerSerializer
