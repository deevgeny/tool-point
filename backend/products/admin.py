from django.contrib import admin

from .models import Product, ProductCategory, ProductSpecification


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'code', 'name', 'category', 'specification']


@admin.register(ProductSpecification)
class ProductSpecificationAdmin(admin.ModelAdmin):
    list_display = ['product', 'density', 'solid_content', 'ph', 'acid_meq',
                    'base_meq', 'solvent_content', 'conductivity',
                    'hegman_fineness', 'viscosity', 'thickness', 'gloss',
                    'adhesion', 'roughness', 'resistivity', 'hiding_power']


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description']
