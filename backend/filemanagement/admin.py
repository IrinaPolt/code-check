from django.contrib import admin

from .models import CodeFile, LogFile


@admin.register(CodeFile)
class CodeFileAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'updated_at')


@admin.register(LogFile)
class LogFileAdmin(admin.ModelAdmin):
    pass
