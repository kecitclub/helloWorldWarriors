# Generated by Django 5.0 on 2025-01-09 21:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Resources',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('drop_off_location', models.CharField(blank=True, max_length=100)),
                ('pick_up_location', models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('quantity', models.PositiveIntegerField()),
                ('description', models.CharField(max_length=200)),
                ('categories', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='resources.category')),
                ('resources', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='resources.resources')),
            ],
        ),
    ]
