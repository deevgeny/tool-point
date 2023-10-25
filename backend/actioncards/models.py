from django.db import models

from products.models import ProductCategory
from quality.models import StandardDefect


class AbstractBaseAction(models.Model):
    """Abstract base action model."""
    task = models.CharField(
        verbose_name='задача',
        max_length=128,
        unique=True
    )
    description = models.CharField(
        verbose_name='описание',
        max_length=512
    )

    class Meta:
        abstract = True

    def __str__(self):
        return self.task


class StandardProcessAction(AbstractBaseAction):
    """Standard process action model."""
    class Meta:
        verbose_name = 'стандартное действие по проверке процесса'
        verbose_name_plural = 'стандартные действия по проверке процесса'


class StandardProductAction(AbstractBaseAction):
    """Standard product action model."""
    class Meta:
        verbose_name = 'стандартное действие по проверке продукта'
        verbose_name_plural = 'стандартные действия по проверке продукта'


class StandardSampleAction(AbstractBaseAction):
    """Standard sample action model."""
    class Meta:
        verbose_name = 'стандартное действие по отправке образца'
        verbose_name_plural = 'стандартные действия по проверке образцов'


class StandardActionMatrix(models.Model):
    """Standard action matrix model."""
    product_category = models.ForeignKey(
        ProductCategory,
        on_delete=models.PROTECT,
        related_name='action_matrix',
        verbose_name='категория продукта'
    )
    defect = models.ForeignKey(
        StandardDefect,
        on_delete=models.PROTECT,
        related_name='action_matrix',
        verbose_name='дефект'
    )
    process_action = models.ForeignKey(
        StandardProcessAction,
        on_delete=models.PROTECT,
        related_name='action_matrix',
        verbose_name='действие по проверке процесса',
        blank=True,
        null=True
    )
    product_action = models.ForeignKey(
        StandardProductAction,
        on_delete=models.PROTECT,
        related_name='action_matrix',
        verbose_name='действие по проверке продукта',
        blank=True,
        null=True
    )
    sample_action = models.ForeignKey(
        StandardSampleAction,
        on_delete=models.PROTECT,
        related_name='action_matrix',
        verbose_name='действие по отправки образа',
        blank=True,
        null=True
    )
    priority = models.PositiveSmallIntegerField(
        verbose_name='приоритет действия',
        help_text='сортировка действий по возрастанию'
    )

    class Meta:
        verbose_name = 'матрица действий'
        verbose_name_plural = 'матрица действий'
        constraints = [
            models.UniqueConstraint(
                fields=['product_category', 'defect', 'process_action'],
                name='unique_process_action_for_defect_and_category'),
            models.UniqueConstraint(
                fields=['product_category', 'defect', 'product_action'],
                name='unique_product_action_for_defect_and_category'),
            models.UniqueConstraint(
                fields=['product_category', 'defect', 'sample_action'],
                name='unique_sample_action_for_defect_and_category'),
            models.UniqueConstraint(
                fields=['product_category', 'defect', 'priority'],
                name='unique_priority_for_defect_and_category'),
        ]

    def __str__(self):
        return f'{self.product_category}-{self.defect}'
