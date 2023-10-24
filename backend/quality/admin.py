from django.contrib import admin

from .models import StandardDefect


@admin.register(StandardDefect)
class DefectAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description', 'image']
