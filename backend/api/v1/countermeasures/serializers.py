from rest_framework import serializers

from qualityproblems.models import Countermeasure


class CountermeasureSerializer(serializers.ModelSerializer):
    """Countermeasure model serializer."""
    class Meta:
        model = Countermeasure
        fields = ['id', 'problem', 'action', 'responsible', 'date', 'status',
                  'result', 'comment']


class CountermeasureListSerializer(CountermeasureSerializer):
    """Countermeasure model list serializer."""
    responsible = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta(CountermeasureSerializer.Meta):
        fields = ['id', 'action', 'responsible', 'date', 'status', 'result',
                  'comment']

    def get_responsible(self, obj):
        return f'{obj.responsible.last_name} {obj.responsible.first_name}'

    def get_status(self, obj):
        return obj.get_status_display()
