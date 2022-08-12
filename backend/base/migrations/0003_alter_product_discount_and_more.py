# Generated by Django 4.1 on 2022-08-12 17:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_color_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='discount',
            field=models.ForeignKey(default='0', null=True, on_delete=django.db.models.deletion.CASCADE, to='base.discount'),
        ),
        migrations.AlterField(
            model_name='shippingaddress',
            name='personId',
            field=models.CharField(blank=True, max_length=11, null=True),
        ),
        migrations.AlterField(
            model_name='shippingaddress',
            name='phone',
            field=models.CharField(max_length=12, null=True),
        ),
        migrations.AlterField(
            model_name='warehouse',
            name='location',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='withoutshipping',
            name='name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='withoutshipping',
            name='personId',
            field=models.CharField(blank=True, max_length=11, null=True),
        ),
        migrations.AlterField(
            model_name='withoutshipping',
            name='phone',
            field=models.CharField(max_length=12, null=True),
        ),
        migrations.AlterField(
            model_name='withoutshipping',
            name='surname',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='withoutshipping',
            name='warehouse',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.warehouse'),
        ),
    ]
