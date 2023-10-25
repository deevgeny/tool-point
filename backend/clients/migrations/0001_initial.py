# Generated by Django 4.2.4 on 2023-10-25 13:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=64, verbose_name='наименование компании')),
            ],
            options={
                'verbose_name': 'компания',
                'verbose_name_plural': 'компании',
            },
        ),
    ]
