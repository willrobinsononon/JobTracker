# Generated by Django 5.0.2 on 2024-03-15 18:37

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('JobAPI', '0006_alter_application_date_applied'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='date_applied',
            field=models.DateField(default=datetime.date(2024, 3, 15)),
        ),
    ]
