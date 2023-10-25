from django.db import models


class Client(models.Model):
    """Client model."""
    company_name = models.CharField(
        verbose_name='наименование компании',
        max_length=64
    )

    class Meta:
        verbose_name = 'компания'
        verbose_name_plural = 'компании'

    def __str__(self):
        return self.company_name
