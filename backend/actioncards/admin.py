from django.contrib import admin

from .models import (
    StandardActionMatrix,
    StandardProcessAction,
    StandardProductAction,
    StandardSampleAction,
)


class BaseActionAdmin(admin.ModelAdmin):
    list_display = ['id', 'task', 'description']


@admin.register(StandardProcessAction)
class StandardProcessActionAdmin(BaseActionAdmin):
    pass


@admin.register(StandardProductAction)
class StandardProductActionAdmin(BaseActionAdmin):
    pass


@admin.register(StandardSampleAction)
class StandardSampleActionAdmin(BaseActionAdmin):
    pass


@admin.register(StandardActionMatrix)
class StandardActionMatrixAdmin(admin.ModelAdmin):
    list_display = ['id', 'product_category', 'defect', 'process_action',
                    'product_action', 'sample_action', 'priority']
