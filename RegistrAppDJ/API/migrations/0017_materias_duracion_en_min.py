# Generated by Django 5.1.2 on 2024-11-06 22:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0016_alter_asistencia_fecha'),
    ]

    operations = [
        migrations.AddField(
            model_name='materias',
            name='duracion_en_min',
            field=models.IntegerField(default=0),
        ),
    ]
