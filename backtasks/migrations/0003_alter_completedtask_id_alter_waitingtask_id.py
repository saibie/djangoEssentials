# Generated by Django 5.0.3 on 2024-05-08 02:51

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("backtasks", "0002_rename_completedtasks_completedtask_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="completedtask",
            name="id",
            field=models.UUIDField(
                default=uuid.uuid4, editable=False, primary_key=True, serialize=False
            ),
        ),
        migrations.AlterField(
            model_name="waitingtask",
            name="id",
            field=models.UUIDField(
                default=uuid.uuid4, editable=False, primary_key=True, serialize=False
            ),
        ),
    ]