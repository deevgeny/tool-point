from rest_framework import serializers

from qualityproblems.models import SampleAction


class SampleActionSerializer(serializers.ModelSerializer):
    """SampleAction model serializer."""
    class Meta:
        model = SampleAction
        fields = ['id', 'problem', 'action', 'responsible', 'date', 'status',
                  'result', 'comment']


class SampleActionListSerializer(SampleActionSerializer):
    """SampleAction model list serializer."""
    responsible = serializers.SerializerMethodField()
    action = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta(SampleActionSerializer.Meta):
        fields = ['id', 'action', 'responsible', 'date', 'status', 'result',
                  'comment']

    def get_responsible(self, obj):
        return f'{obj.responsible.last_name} {obj.responsible.first_name}'

    def get_action(self, obj):
        return obj.action.task

    def get_status(self, obj):
        return obj.get_status_display()
