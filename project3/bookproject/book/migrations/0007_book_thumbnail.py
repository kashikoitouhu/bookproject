# Generated by Django 4.1.2 on 2023-02-06 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("book", "0006_review_text"),
    ]

    operations = [
        migrations.AddField(
            model_name="book",
            name="thumbnail",
            field=models.ImageField(blank=True, null=True, upload_to=""),
        ),
    ]
