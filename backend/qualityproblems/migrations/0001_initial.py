# Generated by Django 4.2.4 on 2023-10-24 19:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clients', '0001_initial'),
        ('quality', '0002_standarddefect_delete_defect'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0004_remove_product_category'),
        ('actioncards', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LineProblem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_date', models.DateTimeField(auto_now_add=True, verbose_name='дата создания')),
                ('edit_date', models.DateTimeField(auto_now=True, verbose_name='дата изменения')),
                ('status', models.CharField(choices=[('FILL', 'Сбор данных'), ('INVESTIGATE', 'Расследование'), ('COUNTERMEASURE', 'Внедрение контрмер'), ('CHECK', 'Отслеживание результата'), ('CLOSED', 'Закрыт')], default='FILL', max_length=16, verbose_name='статус')),
                ('production_line', models.CharField(max_length=64, verbose_name='производственная линия')),
                ('production_area', models.CharField(max_length=64, verbose_name='производственный участок')),
                ('batch_number', models.CharField(max_length=64, verbose_name='партия')),
                ('batch_consumed', models.PositiveIntegerField(verbose_name='использовано на линии')),
                ('model', models.CharField(help_text='название модели/изделия', max_length=64, verbose_name='модель')),
                ('defect_area', models.CharField(help_text='горизонталь / вертикаль, левая сторона / правая сторона ...', max_length=128, verbose_name='зона расположения дефекта')),
                ('defect_location', models.CharField(help_text='деталь/детали, конкретное место/места ...', max_length=128, verbose_name='место расположения дефекта')),
                ('number_of_models', models.PositiveSmallIntegerField(default=1, verbose_name='одна или несколько моделей')),
                ('number_of_lines', models.PositiveSmallIntegerField(default=1, verbose_name='одна или несколько линий')),
                ('number_of_shifts', models.PositiveSmallIntegerField(default=1, verbose_name='одна или несколько смен')),
                ('number_of_batches', models.PositiveSmallIntegerField(default=1, verbose_name='одна или несколько партий')),
                ('number_of_colors', models.PositiveSmallIntegerField(default=1, verbose_name='один или несколько цветов')),
                ('problem_start_date', models.DateTimeField(verbose_name='дата и время появления проблемы')),
                ('batch_start_date', models.DateTimeField(verbose_name='дата и время начала использования партии')),
                ('problem_frequency', models.CharField(max_length=128, verbose_name='периодичность возникновения проблемы')),
                ('dpu', models.PositiveSmallIntegerField(verbose_name='количество дефектов на кузове/изделии')),
                ('number_of_units', models.PositiveSmallIntegerField(verbose_name='количество дефектных кузовов/изделии')),
                ('process_change', models.CharField(max_length=128, verbose_name='изменения продукта')),
                ('extra_info', models.CharField(max_length=2048, verbose_name='дополнительная информация о проблеме')),
                ('batch_qty', models.PositiveIntegerField(verbose_name='запас проблемной партии')),
                ('next_batch_qty', models.PositiveIntegerField(verbose_name='запас следующей доступной партии')),
                ('planned_batch_info', models.CharField(max_length=128, verbose_name='информация о следующей запланированной партии')),
                ('qty_in_transit', models.PositiveIntegerField(verbose_name='количество следующей партии в транзите')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='line_problems', to='clients.client', verbose_name='клиент')),
                ('defect', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='line_problems', to='quality.standarddefect', verbose_name='дефект')),
                ('edited_by', models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='edited_line_problems', to=settings.AUTH_USER_MODEL, verbose_name='внес изменения')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='line_problems', to='products.product', verbose_name='продукт')),
                ('reported_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='line_problems', to=settings.AUTH_USER_MODEL, verbose_name='отчет создал')),
            ],
            options={
                'verbose_name': 'отчет о проблеме на линии',
                'verbose_name_plural': 'отчеты о проблемах на линии',
            },
        ),
        migrations.CreateModel(
            name='SampleAction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(blank=True, null=True, verbose_name='дата')),
                ('status', models.CharField(choices=[('TODO', 'В очереди'), ('PLANNED', 'Запланировано'), ('INPROGRESS', 'В работе'), ('DONE', 'Выполнено')], default='TODO', max_length=16, verbose_name='статус')),
                ('result', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('comment', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('action', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='actions', to='actioncards.standardsampleaction', verbose_name='действие')),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='samples', to='qualityproblems.lineproblem', verbose_name='проблема')),
                ('responsible', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sample_actions', to=settings.AUTH_USER_MODEL, verbose_name='ответственный')),
            ],
            options={
                'verbose_name': 'действие по отправке образца',
                'verbose_name_plural': 'действия по отправке образцов',
            },
        ),
        migrations.CreateModel(
            name='ProductAction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(blank=True, null=True, verbose_name='дата')),
                ('status', models.CharField(choices=[('TODO', 'В очереди'), ('PLANNED', 'Запланировано'), ('INPROGRESS', 'В работе'), ('DONE', 'Выполнено')], default='TODO', max_length=16, verbose_name='статус')),
                ('result', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('comment', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('action', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='actions', to='actioncards.standardproductaction', verbose_name='действие')),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_actions', to='qualityproblems.lineproblem', verbose_name='проблема')),
                ('responsible', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='product_actions', to=settings.AUTH_USER_MODEL, verbose_name='ответственный')),
            ],
            options={
                'verbose_name': 'действие по проверке продукта',
                'verbose_name_plural': 'действия по проверке продукта',
            },
        ),
        migrations.CreateModel(
            name='ProcessAction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(blank=True, null=True, verbose_name='дата')),
                ('status', models.CharField(choices=[('TODO', 'В очереди'), ('PLANNED', 'Запланировано'), ('INPROGRESS', 'В работе'), ('DONE', 'Выполнено')], default='TODO', max_length=16, verbose_name='статус')),
                ('result', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('comment', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('action', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='actions', to='actioncards.standardprocessaction', verbose_name='действие')),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='process_actions', to='qualityproblems.lineproblem', verbose_name='проблема')),
                ('responsible', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='process_actions', to=settings.AUTH_USER_MODEL, verbose_name='ответственный')),
            ],
            options={
                'verbose_name': 'действие по проверке процесса',
                'verbose_name_plural': 'действия по проверке процесса',
            },
        ),
        migrations.CreateModel(
            name='ExtraSampleAction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(blank=True, null=True, verbose_name='дата')),
                ('status', models.CharField(choices=[('TODO', 'В очереди'), ('PLANNED', 'Запланировано'), ('INPROGRESS', 'В работе'), ('DONE', 'Выполнено')], default='TODO', max_length=16, verbose_name='статус')),
                ('result', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('comment', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('action', models.CharField(max_length=256, verbose_name='действие')),
                ('created_by', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.PROTECT, related_name='created_extra_samples', to=settings.AUTH_USER_MODEL, verbose_name='добавил')),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='extra_samples', to='qualityproblems.lineproblem', verbose_name='проблема')),
                ('responsible', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='extra_sample_actions', to=settings.AUTH_USER_MODEL, verbose_name='ответственный')),
            ],
            options={
                'verbose_name': 'действие по отправке образца',
                'verbose_name_plural': 'действия по отправке образцов',
            },
        ),
        migrations.CreateModel(
            name='ExtraAction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(blank=True, null=True, verbose_name='дата')),
                ('status', models.CharField(choices=[('TODO', 'В очереди'), ('PLANNED', 'Запланировано'), ('INPROGRESS', 'В работе'), ('DONE', 'Выполнено')], default='TODO', max_length=16, verbose_name='статус')),
                ('result', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('comment', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('action', models.CharField(max_length=256, verbose_name='действие')),
                ('action_type', models.CharField(choices=[('PRODUCT', 'Продукт'), ('PROCESS', 'Процесс'), ('PEOPLE', 'Люди'), ('METHOD', 'Метод')], max_length=16, verbose_name='')),
                ('created_by', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.PROTECT, related_name='created_extra_actions', to=settings.AUTH_USER_MODEL, verbose_name='добавил')),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='extra_actions', to='qualityproblems.lineproblem', verbose_name='проблема')),
                ('responsible', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='extra_actions', to=settings.AUTH_USER_MODEL, verbose_name='ответственный')),
            ],
            options={
                'verbose_name': 'дополнительные действия',
                'verbose_name_plural': 'дополнительные действия',
            },
        ),
        migrations.CreateModel(
            name='Countermeasure',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(blank=True, null=True, verbose_name='дата')),
                ('status', models.CharField(choices=[('TODO', 'В очереди'), ('PLANNED', 'Запланировано'), ('INPROGRESS', 'В работе'), ('DONE', 'Выполнено')], default='TODO', max_length=16, verbose_name='статус')),
                ('result', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('comment', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('action', models.CharField(max_length=256, verbose_name='действие')),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='countermeasures', to='qualityproblems.lineproblem', verbose_name='проблема')),
                ('responsible', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='contermeasures', to=settings.AUTH_USER_MODEL, verbose_name='ответственный')),
            ],
            options={
                'verbose_name': 'корректирующее мероприятие',
                'verbose_name_plural': 'корректирующие мероприятия',
            },
        ),
        migrations.CreateModel(
            name='Containment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(blank=True, null=True, verbose_name='дата')),
                ('status', models.CharField(choices=[('TODO', 'В очереди'), ('PLANNED', 'Запланировано'), ('INPROGRESS', 'В работе'), ('DONE', 'Выполнено')], default='TODO', max_length=16, verbose_name='статус')),
                ('result', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('comment', models.CharField(blank=True, max_length=1024, verbose_name='результат')),
                ('action', models.CharField(max_length=256, verbose_name='действие')),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='containments', to='qualityproblems.lineproblem', verbose_name='проблема')),
                ('responsible', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='containments', to=settings.AUTH_USER_MODEL, verbose_name='ответственный')),
            ],
            options={
                'verbose_name': 'сдерживающее мероприятие',
                'verbose_name_plural': 'сдерживающие мероприятия',
            },
        ),
    ]
