# Generated by Django 4.1.5 on 2023-01-30 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quizapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='topic',
            field=models.CharField(default='', max_length=50),
        ),
    ]