from django.contrib import admin
from .models import Task


class TasksAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_completed')
    search_fields = ('title',)
    readonly_fields = ('created_at',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(Task,TasksAdmin)
