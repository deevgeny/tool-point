from django.db import models

from specifications.models import (
    Density, SolidContent, Ph, AcidMeq, BaseMeq, SolventContent, Conductivity,
    HegmanFineness, Viscosity, Thickness, Gloss, Adhesion, Roughness,
    Resistivity, HidingPower
)


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

    class Meta:
        verbose_name = 'продукт'
        verbose_name_plural = 'продукты'
    
    def __str__(self):
        return f'{self.code}'

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
        related_name='specification'
    )
    density = models.OneToOneField(
        Density,
        verbose_name=Density._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    solid_content = models.OneToOneField(
        SolidContent,
        verbose_name=SolidContent._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    ph = models.OneToOneField(
        Ph,
        verbose_name=Ph._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    acid_meq = models.OneToOneField(
        AcidMeq,
        verbose_name=AcidMeq._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    base_meq = models.OneToOneField(
        BaseMeq,
        verbose_name=BaseMeq._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    solvent_content = models.OneToOneField(
        SolventContent,
        verbose_name=SolventContent._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    conductivity = models.OneToOneField(
        Conductivity,
        verbose_name=Conductivity._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    hegman_fineness = models.OneToOneField(
        HegmanFineness,
        verbose_name=HegmanFineness._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    viscosity = models.OneToOneField(
        Viscosity,
        verbose_name=Viscosity._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    thickness = models.OneToOneField(
        Thickness,
        verbose_name=Thickness._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    gloss = models.OneToOneField(
        Gloss,
        verbose_name=Gloss._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    adhesion = models.OneToOneField(
        Adhesion,
        verbose_name=Adhesion._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    roughness = models.OneToOneField(
        Roughness,
        verbose_name=Roughness._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    resistivity = models.OneToOneField(
        Resistivity,
        verbose_name=Resistivity._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )
    hiding_power = models.OneToOneField(
        HidingPower,
        verbose_name=HidingPower._meta.verbose_name,
        on_delete=models.PROTECT,
        related_name='product_specification',
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'спецификация продукта'
        verbose_name_plural = 'спецификации продуктов'
    
    def __str__(self):
        return f'{self.product} спецификация'
    
    def delete(self, *args, **kwargs):
        """Override to delete objects in one-to-one fields."""
        obj = super().delete(*args, **kwargs)
        for field in ProductSpecification.CLEAN_ON_DELETE:
            if getattr(self, field):
                getattr(self, field).delete()
        return obj
