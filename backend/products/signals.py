from django.db.models.signals import post_delete
from django.dispatch import receiver

from .models import ProductSpecification


@receiver(post_delete, sender=ProductSpecification)
def delete_referenced_data_in_one_to_one_fields(instance, origin, **kwargs):
    """Delete referenced data in one-to-one fields only for bulk delete."""
    if isinstance(origin, ProductSpecification):
        return
    for field in ProductSpecification.CLEAN_ON_DELETE:
        if getattr(instance, field):
            getattr(instance, field).delete()
