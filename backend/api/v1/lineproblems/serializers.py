from rest_framework import serializers

from api.v1.containments.serializers import ContainmentListSerializer
from api.v1.countermeasures.serializers import CountermeasureListSerializer
from api.v1.extraactions.serializers import ExtraActionListSerializer
from api.v1.extrasampleactions.serializers import (
    ExtraSampleActionListSerializer,
)
from api.v1.processactions.serializers import ProcessActionListSerializer
from api.v1.productactions.serializers import ProductActionListSerializer
from api.v1.sampleactions.serializers import SampleActionListSerializer
from qualityproblems.models import LineProblem


class LineProblemListSerializer(serializers.ModelSerializer):
    """LineProblem model list serializer."""
    client = serializers.SlugRelatedField(slug_field='company_name',
                                          read_only=True)
    defect = serializers.SlugRelatedField(slug_field='name', read_only=True)
    product = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    reported_by = serializers.SerializerMethodField()

    class Meta:
        model = LineProblem
        fields = ['id', 'client', 'defect', 'product', 'status',
                  'problem_start_date', 'reported_by', 'create_date']

    def get_product(self, obj):
        return f'{obj.product.code} {obj.product.name}'

    def get_status(self, obj):
        return obj.get_status_display()

    def get_reported_by(self, obj):
        return f'{obj.reported_by.last_name} {obj.reported_by.first_name}'


class LineProblemCreateRetrieveUpdateSerializer(serializers.ModelSerializer):
    """LineProblem model create retrieve update serializer."""
    process_actions = ProcessActionListSerializer(read_only=True, many=True)
    product_actions = ProductActionListSerializer(read_only=True, many=True)
    sample_actions = SampleActionListSerializer(read_only=True, many=True)
    extra_actions = ExtraActionListSerializer(read_only=True, many=True)
    extra_samples = ExtraSampleActionListSerializer(read_only=True, many=True)
    containments = ContainmentListSerializer(read_only=True, many=True)
    countermeasures = CountermeasureListSerializer(read_only=True, many=True)

    class Meta:
        model = LineProblem
        fields = ['id', 'reported_by', 'create_date', 'edited_by', 'edit_date',
                  'status', 'client', 'production_line', 'production_area',
                  'defect', 'problem_start_date', 'product', 'batch_number',
                  'batch_consumed', 'model', 'defect_area', 'defect_location',
                  'number_of_models', 'number_of_lines', 'number_of_shifts',
                  'number_of_batches', 'number_of_colors', 'batch_start_date',
                  'problem_frequency', 'dpu', 'number_of_units', 'extra_info',
                  'batch_qty', 'next_batch_qty', 'planned_batch_info',
                  'qty_in_transit', 'process_actions', 'product_actions',
                  'sample_actions', 'extra_actions', 'extra_samples',
                  'containments', 'countermeasures']
