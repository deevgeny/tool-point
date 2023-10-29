from rest_framework import serializers

from qualityproblems.models import ExtraSampleAction


class ExtraSampleActionSerializer(serializers.ModelSerializer):
    """ExtraSampleAction model serializer."""
    class Meta:
        model = ExtraSampleAction
        fields = ['id', 'problem', 'action', 'responsible', 'date', 'status',
                  'result', 'comment', 'requested_by']


class ExtraSampleActionListSerializer(ExtraSampleActionSerializer):
    """ExtraSampleAction model list serializer."""
    responsible = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    requested_by = serializers.SerializerMethodField()

    class Meta(ExtraSampleActionSerializer.Meta):
        fields = ['id', 'action', 'responsible', 'date', 'status', 'result',
                  'comment', 'requested_by']

    def get_responsible(self, obj):
        return f'{obj.responsible.last_name} {obj.responsible.first_name}'

    def get_status(self, obj):
        return obj.get_status_display()

    def get_requested_by(self, obj):
        return f'{obj.requested_by.last_name} {obj.requested_by.first_name}'
