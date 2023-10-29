from rest_framework import serializers

from qualityproblems.models import ExtraAction


class ExtraActionSerializer(serializers.ModelSerializer):
    """ExtraAction model serializer."""
    class Meta:
        model = ExtraAction
        fields = ['id', 'problem', 'action', 'action_type', 'responsible',
                  'date', 'status', 'result', 'comment', 'requested_by']


class ExtraActionListSerializer(ExtraActionSerializer):
    """ExtraAction model list serializer."""
    action_type = serializers.SerializerMethodField()
    responsible = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    requested_by = serializers.SerializerMethodField()

    class Meta(ExtraActionSerializer.Meta):
        fields = ['id', 'action', 'action_type', 'responsible', 'date',
                  'status', 'result', 'comment', 'requested_by']

    def get_action_type(self, obj):
        return obj.get_action_type_display()

    def get_responsible(self, obj):
        return f'{obj.responsible.last_name} {obj.responsible.first_name}'

    def get_status(self, obj):
        return obj.get_status_display()

    def get_requested_by(self, obj):
        return f'{obj.requested_by.last_name} {obj.requested_by.first_name}'
