# Generated by Django 4.1 on 2022-10-03 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='color',
            name='image',
            field=models.ImageField(blank=True, default='defaultImage.png', null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/defaultImage.png', null=True, upload_to=''),
        ),
    ]
