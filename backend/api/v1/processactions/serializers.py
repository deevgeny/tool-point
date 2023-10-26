from rest_framework import serializers

from qualityproblems.models import ProcessAction


class ProcessActionSerializer(serializers.ModelSerializer):
    """ProcessAction model serializer."""
    class Meta:
        model = ProcessAction
        fields = ['id', 'problem', 'action', 'responsible', 'date', 'status',
                  'result', 'comment']


class ProcessActionListSerializer(ProcessActionSerializer):
    """ProcessAction model list serializer."""
    responsible = serializers.SerializerMethodField()
    action = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta(ProcessActionSerializer.Meta):
        fields = ['id', 'action', 'responsible', 'date', 'status', 'result',
                  'comment']

    def get_responsible(self, obj):
        return f'{obj.responsible.last_name} {obj.responsible.first_name}'

    def get_action(self, obj):
        return obj.action.task

    def get_status(self, obj):
        return obj.get_status_display()
