from django.db.models import Model
from django.db.models.query import QuerySet

from actioncards.models import StandardActionMatrix

from . import models


class LineProblemService:
    """Line problem service."""

    NOT_REQUIRED_FIELDS = ('_state', 'extra_info', 'edited_by_id')

    def __update_fill_status(self, obj: Model) -> None:
        """Change FILL to INVESTIGATE if all required fields are filled."""
        for key, value in obj.__dict__.items():
            if key in self.NOT_REQUIRED_FIELDS:
                continue
            if not bool(value):
                return
        obj.status = obj.Status.INVESTIGATE

    def update_status(self, obj: Model) -> None:
        """Update problem status."""
        if obj.status == obj.Status.FILL:
            self.__update_fill_status(obj)


class ActionService:
    """Action service to generate standard action cards for new problem."""

    def get_queryset(self, obj: Model) -> QuerySet:
        return StandardActionMatrix.objects.filter(
            defect=obj.defect, product_category=obj.product.category
        )

    def create_standard_actions(self, obj: Model) -> None:
        """Create standard actions to investigate line problem."""
        queryset = self.get_queryset(obj)
        objects = {'process_action': [], 'product_action': [],
                   'sample_action': []}
        # Create action objects
        for obj in queryset:
            if obj.process_action:
                objects['process_action'].append(
                    models.ProcessAction(responsible=obj.reported_by,
                                         action=obj.process_action,
                                         problem=obj)
                )
            if obj.product_action:
                objects['product_action'].append(
                    models.ProductAction(responsible=obj.reported_by,
                                         action=obj.product_action,
                                         problem=obj)
                )
            if obj.sample_action:
                objects['sample_action'].append(
                    models.SampleAction(responsible=obj.reported_by,
                                        action=obj.sample_action,
                                        problem=obj)
                )
        # Bulk create standard actions
        models.ProcessAction.objects.bulk_create(objects['process_action'])
        models.ProductAction.objects.bulk_create(objects['product_action'])
        models.SampleAction.objects.bulk_create(objects['sample_action'])
