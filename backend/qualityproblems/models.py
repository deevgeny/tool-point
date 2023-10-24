from django.contrib.auth import get_user_model
from django.db import models

from actioncards.models import (
    StandardProcessAction,
    StandardProductAction,
    StandardSampleAction,
)
from clients.models import Client
from products.models import Product
from quality.models import StandardDefect

User = get_user_model()


class LineProblem(models.Model):
    """Line problem model."""

    class Status(models.TextChoices):
        FILL = 'FILL', 'Сбор данных'
        INVESTIGATE = 'INVESTIGATE', 'Расследование'
        COUNTERMEASURE = 'COUNTERMEASURE', 'Внедрение контрмер'
        CHECK = 'CHECK', 'Отслеживание результата'
        CLOSED = 'CLOSED', 'Закрыт'

    reported_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='line_problems',
        verbose_name='отчет создал',
    )
    create_date = models.DateTimeField(
        verbose_name='дата создания',
        auto_now_add=True
    )
    edited_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='edited_line_problems',
        verbose_name='внес изменения',
        editable=False,
        blank=True,
        null=True
    )
    edit_date = models.DateTimeField(
        verbose_name='дата изменения',
        auto_now=True
    )
    status = models.CharField(
        verbose_name='статус',
        max_length=16,
        choices=Status.choices,
        default=Status.FILL
    )
    client = models.ForeignKey(
        Client,
        on_delete=models.PROTECT,
        related_name='line_problems',
        verbose_name='клиент'
    )
    production_line = models.CharField(  # Change to ForeignKey
        verbose_name='производственная линия',
        max_length=64
    )
    production_area = models.CharField(
        verbose_name='производственный участок',
        max_length=64
    )
    defect = models.ForeignKey(
        StandardDefect,
        on_delete=models.PROTECT,
        related_name='line_problems',
        verbose_name='дефект'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        related_name='line_problems',
        verbose_name='продукт'
    )
    batch_number = models.CharField(
        verbose_name='партия',
        max_length=64
    )
    batch_consumed = models.PositiveIntegerField(
        verbose_name='использовано на линии',
    )
    model = models.CharField(
        verbose_name='модель',
        max_length=64,
        help_text='название модели/изделия'
    )
    defect_area = models.CharField(
        verbose_name='зона расположения дефекта',
        max_length=128,
        help_text='горизонталь / вертикаль, левая сторона / правая сторона ...'
    )
    defect_location = models.CharField(
        verbose_name='место расположения дефекта',
        max_length=128,
        help_text='деталь/детали, конкретное место/места ...'
    )
    number_of_models = models.PositiveSmallIntegerField(
        verbose_name='одна или несколько моделей',
        default=1
    )
    number_of_lines = models.PositiveSmallIntegerField(
        verbose_name='одна или несколько линий',
        default=1
    )
    number_of_shifts = models.PositiveSmallIntegerField(
        verbose_name='одна или несколько смен',
        default=1
    )
    number_of_batches = models.PositiveSmallIntegerField(
        verbose_name='одна или несколько партий',
        default=1
    )
    number_of_colors = models.PositiveSmallIntegerField(
        verbose_name='один или несколько цветов',
        default=1
    )
    problem_start_date = models.DateTimeField(
        verbose_name='дата и время появления проблемы',
    )
    batch_start_date = models.DateTimeField(
        verbose_name='дата и время начала использования партии',
    )
    problem_frequency = models.CharField(
        verbose_name='периодичность возникновения проблемы',
        max_length=128
    )
    dpu = models.PositiveSmallIntegerField(
        verbose_name='количество дефектов на кузове/изделии'
    )
    number_of_units = models.PositiveSmallIntegerField(
        verbose_name='количество дефектных кузовов/изделии'
    )
    process_change = models.CharField(
        verbose_name='изменения процесса',
        max_length=128
    )
    process_change = models.CharField(
        verbose_name='изменения продукта',
        max_length=128
    )
    extra_info = models.CharField(
        verbose_name='дополнительная информация о проблеме',
        max_length=2048
    )
    batch_qty = models.PositiveIntegerField(
        verbose_name='запас проблемной партии'
    )
    next_batch_qty = models.PositiveIntegerField(
        verbose_name='запас следующей доступной партии'
    )
    planned_batch_info = models.CharField(
        verbose_name='информация о следующей запланированной партии',
        max_length=128
    )
    qty_in_transit = models.PositiveIntegerField(
        verbose_name='количество следующей партии в транзите'
    )

    class Meta:
        verbose_name = 'отчет о проблеме на линии'
        verbose_name_plural = 'отчеты о проблемах на линии'

    def __str__(self):
        return f'{self.client} {self.production_line} {self.defect}'

    def save(self, *args, **kwargs):
        """Update report status."""
        super().save(*args, **kwargs)


class AbstractBaseAction(models.Model):
    """Abstract base action model."""

    class Status(models.TextChoices):
        TODO = 'TODO', 'В очереди'
        PLANNED = 'PLANNED', 'Запланировано'
        INPROGRESS = 'INPROGRESS', 'В работе'
        DONE = 'DONE', 'Выполнено'

    date = models.DateField(
        verbose_name='дата',
        blank=True,
        null=True
    )
    status = models.CharField(
        verbose_name='статус',
        max_length=16,
        choices=Status.choices,
        default=Status.TODO
    )
    result = models.CharField(
        verbose_name='результат',
        max_length=1024,
        blank=True
    )
    comment = models.CharField(
        verbose_name='результат',
        max_length=1024,
        blank=True
    )

    class Meta:
        abstract = True

    def __str__(self):
        return f'{self.responsible} {self.date} {self.status}'


class ProcessAction(AbstractBaseAction):
    """Process action model."""
    responsible = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='process_actions',
        verbose_name='ответственный'
    )
    action = models.ForeignKey(
        StandardProcessAction,
        on_delete=models.PROTECT,
        related_name='actions',
        verbose_name='действие'
    )
    problem = models.ForeignKey(
        LineProblem,
        on_delete=models.CASCADE,
        related_name='process_actions',
        verbose_name='проблема'
    )

    class Meta:
        verbose_name = 'действие по проверке процесса'
        verbose_name_plural = 'действия по проверке процесса'


class ProductAction(AbstractBaseAction):
    """Product action model."""
    responsible = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='product_actions',
        verbose_name='ответственный'
    )
    action = models.ForeignKey(
        StandardProductAction,
        on_delete=models.PROTECT,
        related_name='actions',
        verbose_name='действие'
    )
    problem = models.ForeignKey(
        LineProblem,
        on_delete=models.CASCADE,
        related_name='product_actions',
        verbose_name='проблема'
    )

    class Meta:
        verbose_name = 'действие по проверке продукта'
        verbose_name_plural = 'действия по проверке продукта'


class SampleAction(AbstractBaseAction):
    """Sample shipmnet action model."""
    responsible = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='sample_actions',
        verbose_name='ответственный'
    )
    action = models.ForeignKey(
        StandardSampleAction,
        on_delete=models.PROTECT,
        related_name='actions',
        verbose_name='действие'
    )
    problem = models.ForeignKey(
        LineProblem,
        on_delete=models.CASCADE,
        related_name='samples',
        verbose_name='проблема'
    )

    class Meta:
        verbose_name = 'действие по отправке образца'
        verbose_name_plural = 'действия по отправке образцов'


class ExtraSampleAction(AbstractBaseAction):
    """Extra sample shipment action model."""
    responsible = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='extra_sample_actions',
        verbose_name='ответственный'
    )
    action = models.CharField(
        verbose_name='действие',
        max_length=256
    )
    problem = models.ForeignKey(
        LineProblem,
        on_delete=models.CASCADE,
        related_name='extra_samples',
        verbose_name='проблема'
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='created_extra_samples',
        verbose_name='добавил',
        editable=False
    )

    class Meta:
        verbose_name = 'действие по отправке образца'
        verbose_name_plural = 'действия по отправке образцов'


class ExtraAction(AbstractBaseAction):
    """Extra action model."""

    class ActionType(models.TextChoices):
        PRODUCT = 'PRODUCT', 'Продукт'
        PROCESS = 'PROCESS', 'Процесс'
        PEOPLE = 'PEOPLE', 'Люди'
        METHOD = 'METHOD', 'Метод'

    responsible = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='extra_actions',
        verbose_name='ответственный'
    )
    problem = models.ForeignKey(
        LineProblem,
        on_delete=models.CASCADE,
        related_name='extra_actions',
        verbose_name='проблема'
    )
    action = models.CharField(
        verbose_name='действие',
        max_length=256
    )
    action_type = models.CharField(
        verbose_name='',
        max_length=16,
        choices=ActionType.choices,
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='created_extra_actions',
        verbose_name='добавил',
        editable=False
    )

    class Meta:
        verbose_name = 'дополнительные действия'
        verbose_name_plural = 'дополнительные действия'


class Containment(AbstractBaseAction):
    """Containment actions model."""
    responsible = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='containments',
        verbose_name='ответственный'
    )
    action = models.CharField(
        verbose_name='действие',
        max_length=256
    )
    problem = models.ForeignKey(
        LineProblem,
        on_delete=models.CASCADE,
        related_name='containments',
        verbose_name='проблема'
    )

    class Meta:
        verbose_name = 'сдерживающее мероприятие'
        verbose_name_plural = 'сдерживающие мероприятия'


class Countermeasure(AbstractBaseAction):
    """Contermeasure actions model."""
    responsible = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='contermeasures',
        verbose_name='ответственный'
    )
    action = models.CharField(
        verbose_name='действие',
        max_length=256
    )
    problem = models.ForeignKey(
        LineProblem,
        on_delete=models.CASCADE,
        related_name='countermeasures',
        verbose_name='проблема'
    )

    class Meta:
        verbose_name = 'корректирующее мероприятие'
        verbose_name_plural = 'корректирующие мероприятия'
