# Generated by Django 5.1.3 on 2024-11-22 01:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fs', '0005_producto_fechadeactualizacion'),
    ]

    operations = [
        migrations.AddField(
            model_name='venta',
            name='direccion',
            field=models.CharField(default='', max_length=300),
        ),
        migrations.AddField(
            model_name='venta',
            name='instalacion',
            field=models.BooleanField(default=False),
        ),
    ]
