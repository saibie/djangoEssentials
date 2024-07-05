from django.contrib import admin
from .models import WaitingTask, CompletedTask

# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    display_filter = ['name']
    list_display = ['name', 'params', 'made_at', 'run_at']

@admin.register(WaitingTask)
class WaitingTasksAdmin(TaskAdmin):
    pass

@admin.register(CompletedTask)
class CompletedTasksAdmin(TaskAdmin):
    pass
