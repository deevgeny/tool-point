from django.contrib import admin

from .models import (
    Containment,
    Countermeasure,
    ExtraAction,
    ExtraSampleAction,
    LineProblem,
    ProcessAction,
    ProductAction,
    SampleAction,
)


@admin.register(LineProblem)
class LineProblemAdmin(admin.ModelAdmin):
    list_display = ['id', 'reported_by', 'create_date', 'client', 'defect',
                    'status']


@admin.register(ExtraAction)
class ExtraActionAdmin(admin.ModelAdmin):
    list_display = ['id', 'responsible', 'action', 'action_type', 'problem',
                    'date', 'status', 'result', 'comment', 'created_by']


@admin.register(ExtraSampleAction)
class ExtraSampleActionAdmin(admin.ModelAdmin):
    list_display = ['id', 'responsible', 'action', 'problem', 'date', 'status',
                    'result', 'comment', 'created_by']


class BaseActionAdmin(admin.ModelAdmin):
    list_display = ['id', 'responsible', 'action', 'problem', 'date', 'status',
                    'result', 'comment']


@admin.register(ProcessAction)
class ProcessActionAdmin(BaseActionAdmin):
    pass


@admin.register(ProductAction)
class ProductActionAdmin(BaseActionAdmin):
    pass


@admin.register(SampleAction)
class SampleActionAdmin(BaseActionAdmin):
    pass


@admin.register(Containment)
class ContainmentAdmin(BaseActionAdmin):
    pass


@admin.register(Countermeasure)
class CountermeasureAdmin(BaseActionAdmin):
    pass
