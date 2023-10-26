from rest_framework import serializers

from qualityproblems.models import ProductAction


class ProductActionSerializer(serializers.ModelSerializer):
    """ProductAction model serializer."""
    class Meta:
        model = ProductAction
        fields = ['id', 'problem', 'action', 'responsible', 'date', 'status',
                  'result', 'comment']


class ProductActionListSerializer(serializers.ModelSerializer):
    """ProductAction model list serializer."""
    responsible = serializers.SerializerMethodField()
    action = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta(ProductActionSerializer.Meta):
        fields = ['id', 'action', 'responsible', 'date', 'status', 'result',
                  'comment']

    def get_responsible(self, obj):
        return f'{obj.responsible.last_name} {obj.responsible.first_name}'

    def get_action(self, obj):
        return obj.action.task

    def get_status(self, obj):
        return obj.get_status_display()
