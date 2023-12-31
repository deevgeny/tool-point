# Generated by Django 4.2.4 on 2023-10-25 13:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Method',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, verbose_name='Наименование метода')),
            ],
            options={
                'verbose_name': 'метод',
                'verbose_name_plural': 'методы',
            },
        ),
        migrations.CreateModel(
            name='Uom',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=8, unique=True, verbose_name='Сокращенное наименование единицы измерения')),
                ('description', models.CharField(blank=True, max_length=32, verbose_name='Описание')),
            ],
            options={
                'verbose_name': 'единица измерения',
                'verbose_name_plural': 'единицы измерения',
            },
        ),
        migrations.CreateModel(
            name='Viscosity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'Вязкость',
                'verbose_name_plural': 'Вязкость',
            },
        ),
        migrations.CreateModel(
            name='Thickness',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'Толщина покрытия',
                'verbose_name_plural': 'Толщина покрытия',
            },
        ),
        migrations.CreateModel(
            name='SolventContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'Содержание сольвентов',
                'verbose_name_plural': 'Содержание сольвентов',
            },
        ),
        migrations.CreateModel(
            name='SolidContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'сухой остаток',
                'verbose_name_plural': 'сухой остаток',
            },
        ),
        migrations.CreateModel(
            name='Roughness',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'Шероховатость',
                'verbose_name_plural': 'Шероховатость',
            },
        ),
        migrations.CreateModel(
            name='Resistivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'Удельное сопротивление',
                'verbose_name_plural': 'Удельное сопротивление',
            },
        ),
        migrations.CreateModel(
            name='Ph',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'ph',
                'verbose_name_plural': 'ph',
            },
        ),
        migrations.CreateModel(
            name='HidingPower',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'Укрывистость',
                'verbose_name_plural': 'Укрывистость',
            },
        ),
        migrations.CreateModel(
            name='HegmanFineness',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'Степень перетира по Хегману',
                'verbose_name_plural': 'Степень перетира по Хегману',
            },
        ),
        migrations.CreateModel(
            name='Gloss',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'Блеск',
                'verbose_name_plural': 'Блеск',
            },
        ),
        migrations.CreateModel(
            name='Density',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'плотность',
                'verbose_name_plural': 'плотность',
            },
        ),
        migrations.CreateModel(
            name='Conductivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'Электропроводность',
                'verbose_name_plural': 'Электропроводность',
            },
        ),
        migrations.CreateModel(
            name='BaseMeq',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'Эквивалентная масса основания',
                'verbose_name_plural': 'Эквивалентная масса основания',
            },
        ),
        migrations.CreateModel(
            name='Adhesion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'Адгезия',
                'verbose_name_plural': 'Адгезия',
            },
        ),
        migrations.CreateModel(
            name='AcidMeq',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(blank=True, max_length=64, verbose_name='Особые условия')),
                ('min_value', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True, verbose_name='Минимальное значение')),
                ('max_value', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True, verbose_name='Максимальное значение')),
                ('method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.method', verbose_name='Метод')),
                ('uom', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='specifications.uom', verbose_name='Единица измерения')),
            ],
            options={
                'verbose_name': 'Эквивалентная масса кислоты',
                'verbose_name_plural': 'Эквивалентная масса кислоты',
            },
        ),
    ]
