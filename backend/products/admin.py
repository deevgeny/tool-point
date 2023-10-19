from django.contrib import admin

from .models import Product, ProductSpecification


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'code', 'name', 'specification']


@admin.register(ProductSpecification)
class ProductSpecificationAdmin(admin.ModelAdmin):
    list_display = ['product', 'density', 'solid_content', 'ph', 'acid_meq',
                    'base_meq', 'solvent_content', 'conductivity',
                    'hegman_fineness', 'viscosity', 'thickness', 'gloss',
                    'adhesion', 'roughness', 'resistivity', 'hiding_power']
