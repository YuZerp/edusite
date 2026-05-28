from django.contrib import admin
from .models import Application

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'phone', 'subject', 'grade', 'created_at']
    list_filter = ['subject', 'grade', 'created_at']
    search_fields = ['name', 'phone']
    readonly_fields = ['created_at']
    fields = ['name', 'phone', 'subject', 'grade', 'brief', 'created_at']