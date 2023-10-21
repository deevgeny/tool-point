from django.contrib import admin

from .models import (
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


@admin.register(Uom)
class UomAdmin(admin.ModelAdmin):
    pass


@admin.register(Method)
class MethodAdmin(admin.ModelAdmin):
    pass


class BaseSpecificationAdmin(admin.ModelAdmin):
    """Base specification class for admin site."""
    list_display = ['id', 'product_spec', 'method', 'min_value',
                    'max_value', 'uom']


@admin.register(Density)
class DensityAdmin(BaseSpecificationAdmin):
    pass


@admin.register(SolidContent)
class SolidContentAdmin(BaseSpecificationAdmin):
    pass


@admin.register(Ph)
class PhAdmin(BaseSpecificationAdmin):
    pass


@admin.register(AcidMeq)
class AcidMeqAdmin(BaseSpecificationAdmin):
    pass


@admin.register(BaseMeq)
class BaseMeqAdmin(BaseSpecificationAdmin):
    pass


@admin.register(SolventContent)
class SolventContentAdmin(BaseSpecificationAdmin):
    pass


@admin.register(Conductivity)
class ConductivityAdmin(BaseSpecificationAdmin):
    pass


@admin.register(HegmanFineness)
class HegmanFinenessAdmin(BaseSpecificationAdmin):
    pass


@admin.register(Viscosity)
class ViscosityAdmin(BaseSpecificationAdmin):
    pass


@admin.register(Thickness)
class ThicknessAdmin(BaseSpecificationAdmin):
    pass


@admin.register(Gloss)
class GlossAdmin(BaseSpecificationAdmin):
    pass


@admin.register(Adhesion)
class AdhesionAdmin(BaseSpecificationAdmin):
    pass


@admin.register(Roughness)
class RoughnessAdmin(BaseSpecificationAdmin):
    pass


@admin.register(Resistivity)
class ResistivityAdmin(BaseSpecificationAdmin):
    pass


@admin.register(HidingPower)
class ResistivityAdmin(BaseSpecificationAdmin):
    pass
