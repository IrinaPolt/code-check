from django.core.exceptions import ValidationError
from django.db import models

from users.models import User


def validate_file_extension(value):
    if not value.name.endswith('.py'):
        raise ValidationError('File should have the .py extension')


class CodeFile(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    title = models.CharField(
        max_length=256,
    )
    file = models.FileField(
        upload_to='codefiles/',
        validators=[validate_file_extension]
    )
    text = models.TextField()
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.title


class LogFile(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    file = models.FileField(upload_to='check_logs/')
    timestamp = models.DateTimeField(auto_now_add=True)
    log = models.TextField()
