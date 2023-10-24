from django.db import models


class StandardDefect(models.Model):
    """Standard defect model."""
    name = models.CharField(
        verbose_name='название дефекта',
        max_length=64,
        unique=True
    )
    description = models.CharField(
        verbose_name='описание дефекта',
        max_length=512
    )
    image = models.ImageField(
        verbose_name='фото дефекта',
        upload_to='images/defects/',
        unique=True,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'стандартый дефект'
        verbose_name_plural = 'стандартные дефекты'

    def __str__(self):
        return self.name
