# Generated by Django 4.2.4 on 2023-10-28 07:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('qualityproblems', '0003_alter_lineproblem_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lineproblem',
            name='problem_frequency',
        ),
        migrations.AddField(
            model_name='lineproblem',
            name='defect_frequency',
            field=models.CharField(blank=True, max_length=128, verbose_name='периодичность возникновения дефекта'),
        ),
    ]
