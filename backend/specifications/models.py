from django.db import models


class Uom(models.Model):
    """Unit of measure model."""
    name = models.CharField(
        verbose_name='Сокращенное наименование единицы измерения',
        max_length=8
    )
    description = models.CharField(
        verbose_name='Описание',
        max_length=32,
        blank=True
    )

    class Meta:
        verbose_name = 'единица измерения'
        verbose_name_plural = 'единицы измерения'
    
    def __str__(self):
        return f'{self.name}'


class Method(models.Model):
    """Specification method model."""
    name = models.CharField(
        verbose_name='Наименование метода',
        max_length=64
    )

    class Meta:
        verbose_name = 'метод'
        verbose_name_plural = 'методы'
    
    def __str__(self):
        return f'{self.name}'


class AbstractSpecification(models.Model):
    """Base abstract specification model."""
    method = models.ForeignKey(
        Method,
        verbose_name='Метод',
        on_delete=models.PROTECT,
        related_name='+',
        blank=True,
        null=True
    )
    uom = models.ForeignKey(
        Uom,
        verbose_name='Единица измерения',
        on_delete=models.PROTECT,
        related_name='+',
        blank=True,
        null=True
    )
    condition = models.CharField(
        verbose_name='Особые условия',
        max_length=64,
        blank=True
    )
    min_value = models.PositiveSmallIntegerField(
        verbose_name='Минимальное значение',
        blank=True,
        null=True
    )
    max_value = models.PositiveSmallIntegerField(
        verbose_name='Максимальное значение',
        blank=True,
        null=True
    )

    class Meta:
        abstract = True


class Density(AbstractSpecification):
    """Density specification model."""
    min_value = models.DecimalField(
        verbose_name='Минимальное значение',
        max_digits=4,
        decimal_places=2,
        blank=True,
        null=True
    )
    max_value = models.DecimalField(
        verbose_name='Максимальное значение',
        max_digits=4,
        decimal_places=2,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'плотность'
        verbose_name_plural = 'плотность'


class SolidContent(AbstractSpecification):
    """Solid content specification model."""
    min_value = models.DecimalField(
        verbose_name='Минимальное значение',
        max_digits=4,
        decimal_places=2,
        blank=True,
        null=True
    )
    max_value = models.DecimalField(
        verbose_name='Максимальное значение',
        max_digits=4,
        decimal_places=2,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'сухой остаток'
        verbose_name_plural = 'сухой остаток'


class Ph(AbstractSpecification):
    """Ph specification model."""
    min_value = models.DecimalField(
        verbose_name='Минимальное значение',
        max_digits=3,
        decimal_places=2,
        blank=True,
        null=True
    )
    max_value = models.DecimalField(
        verbose_name='Максимальное значение',
        max_digits=3,
        decimal_places=2,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'ph'
        verbose_name_plural = 'ph'


class AcidMeq(AbstractSpecification):
    """Acid mEq specification model."""
    min_value = models.DecimalField(
        verbose_name='Минимальное значение',
        max_digits=3,
        decimal_places=2,
        blank=True,
        null=True
    )
    max_value = models.DecimalField(
        verbose_name='Максимальное значение',
        max_digits=3,
        decimal_places=2,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'Эквивалентная масса кислоты'
        verbose_name_plural = 'Эквивалентная масса кислоты'


class BaseMeq(AbstractSpecification):
    """Base mEq specification model."""
    min_value = models.DecimalField(
        verbose_name='Минимальное значение',
        max_digits=3,
        decimal_places=2,
        blank=True,
        null=True
    )
    max_value = models.DecimalField(
        verbose_name='Максимальное значение',
        max_digits=3,
        decimal_places=2,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'Эквивалентная масса основания'
        verbose_name_plural = 'Эквивалентная масса основания'


class SolventContent(AbstractSpecification):
    """Solvent content specification model."""
    min_value = models.DecimalField(
        verbose_name='Минимальное значение',
        max_digits=3,
        decimal_places=2,
        blank=True,
        null=True
    )
    max_value = models.DecimalField(
        verbose_name='Максимальное значение',
        max_digits=3,
        decimal_places=2,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'Содержание сольвентов'
        verbose_name_plural = 'Содержание сольвентов'


class Conductivity(AbstractSpecification):
    """Conductivity specification model."""

    class Meta:
        verbose_name = 'Электропроводность'
        verbose_name_plural = 'Электропроводность'


class HegmanFineness(AbstractSpecification):
    """Hegman fineness specification model."""

    class Meta:
        verbose_name = 'Степень перетира по Хегману'
        verbose_name_plural = 'Степень перетира по Хегману'


class Viscosity(AbstractSpecification):
    """Viscosity specification model."""

    class Meta:
        verbose_name = 'Вязкость'
        verbose_name_plural = 'Вязкость'


class Thickness(AbstractSpecification):
    """Thickness specification model."""

    class Meta:
        verbose_name = 'Толщина покрытия'
        verbose_name_plural = 'Толщина покрытия'


class Gloss(AbstractSpecification):
    """Gloss specification model."""

    class Meta:
        verbose_name = 'Блеск'
        verbose_name_plural = 'Блеск'


class Adhesion(AbstractSpecification):
    """Adhesion specification model."""

    class Meta:
        verbose_name = 'Адгезия'
        verbose_name_plural = 'Адгезия'


class Roughness(AbstractSpecification):
    """Roughness specification model."""

    class Meta:
        verbose_name = 'Шероховатость'
        verbose_name_plural = 'Шероховатость'


class Resistivity(AbstractSpecification):
    """Resistivity specification model."""

    class Meta:
        verbose_name = 'Удельное сопротивление'
        verbose_name_plural = 'Удельное сопротивление'


class HidingPower(AbstractSpecification):
    """Hiding power specification model."""

    class Meta:
        verbose_name = 'Укрывистость'
        verbose_name_plural = 'Укрывистость'
