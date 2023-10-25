from django.db import models

from specifications.models import (
    AcidMeq,
    Adhesion,
    BaseMeq,
    Conductivity,
    Density,
    Gloss,
    HegmanFineness,
    HidingPower,
    Ph,
    Resistivity,
    Roughness,
    SolidContent,
    SolventContent,
    Thickness,
    Viscosity,
)


class ProductCategory(models.Model):
    """Product category model."""
    name = models.CharField(
        verbose_name='название',
        max_length=32
    )
    description = models.CharField(
        verbose_name='описание',
        max_length=128
    )

    class Meta:
        verbose_name = 'категория продукта'
        verbose_name_plural = 'категории продуктов'

    def __str__(self):
        return self.name


class Product(models.Model):
    """Product model."""
    code = models.CharField(
        verbose_name='Код продукта',
        max_length=32,
        unique=True
    )
    name = models.CharField(
        verbose_name='Наименование',
        max_length=64,
        unique=True
    )
    category = models.ForeignKey(
        ProductCategory,
        on_delete=models.PROTECT,
        related_name='products',
        verbose_name='категория продукта'
    )

    class Meta:
        verbose_name = 'продукт'
        verbose_name_plural = 'продукты'

    def __str__(self):
        return self.code

    def save(self, *args, **kwargs):
        """Create product specification for every new product."""
        if self.pk is None:
            super().save(*args, **kwargs)
            ProductSpecification.objects.create(product=self)
            return
        super().save(*args, **kwargs)


class ProductSpecification(models.Model):
    """Product specification model."""

    CLEAN_ON_DELETE = [
        'density', 'solid_content', 'ph', 'acid_meq', 'base_meq',
        'solvent_content', 'conductivity', 'hegman_fineness', 'viscosity',
        'thickness', 'gloss', 'adhesion', 'roughness', 'resistivity',
        'hiding_power'
    ]

    product = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='specification',
        verbose_name='продукт'
    )
    density = models.OneToOneField(
        Density,
        verbose_name=Density._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    solid_content = models.OneToOneField(
        SolidContent,
        verbose_name=SolidContent._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    ph = models.OneToOneField(
        Ph,
        verbose_name=Ph._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    acid_meq = models.OneToOneField(
        AcidMeq,
        verbose_name=AcidMeq._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    base_meq = models.OneToOneField(
        BaseMeq,
        verbose_name=BaseMeq._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    solvent_content = models.OneToOneField(
        SolventContent,
        verbose_name=SolventContent._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    conductivity = models.OneToOneField(
        Conductivity,
        verbose_name=Conductivity._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    hegman_fineness = models.OneToOneField(
        HegmanFineness,
        verbose_name=HegmanFineness._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    viscosity = models.OneToOneField(
        Viscosity,
        verbose_name=Viscosity._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    thickness = models.OneToOneField(
        Thickness,
        verbose_name=Thickness._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    gloss = models.OneToOneField(
        Gloss,
        verbose_name=Gloss._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    adhesion = models.OneToOneField(
        Adhesion,
        verbose_name=Adhesion._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    roughness = models.OneToOneField(
        Roughness,
        verbose_name=Roughness._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    resistivity = models.OneToOneField(
        Resistivity,
        verbose_name=Resistivity._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )
    hiding_power = models.OneToOneField(
        HidingPower,
        verbose_name=HidingPower._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_spec',
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'спецификация продукта'
        verbose_name_plural = 'спецификации продуктов'

    def __str__(self):
        return f'спецификация {self.product}'

    def delete(self, *args, **kwargs):
        """Override to delete referenced objects in one-to-one fields."""
        obj = super().delete(*args, **kwargs)
        for field in ProductSpecification.CLEAN_ON_DELETE:
            if getattr(self, field):
                getattr(self, field).delete()
        return obj  # noqa R504
