# Generated by Django 4.1 on 2023-01-09 22:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='expiration_date',
            field=models.DateTimeField(null=True),
        ),
    ]
