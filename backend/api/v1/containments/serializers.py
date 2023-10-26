from rest_framework import serializers

from qualityproblems.models import Containment


class ContainmentSerializer(serializers.ModelSerializer):
    """Containment model serializer."""
    class Meta:
        model = Containment
        fields = ['id', 'problem', 'action', 'responsible', 'date', 'status',
                  'result', 'comment']


class ContainmentListSerializer(ContainmentSerializer):
    """Containment model list serializer."""
    responsible = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta(ContainmentSerializer.Meta):
        fields = ['id', 'action', 'responsible', 'date', 'status', 'result',
                  'comment']

    def get_responsible(self, obj):
        return f'{obj.responsible.last_name} {obj.responsible.first_name}'

    def get_status(self, obj):
        return obj.get_status_display()
