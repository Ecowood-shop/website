# Generated by Django 4.1 on 2022-10-11 23:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_product_coveragelength_delete_productattribute'),
    ]

    operations = [
        migrations.AlterField(
            model_name='discount',
            name='discount_percent',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=3, null=True),
        ),
    ]
