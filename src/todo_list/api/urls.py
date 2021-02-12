from django.contrib import admin
from django.urls import path, include
from .views import (
    task_list_view,
    task_view,
    task_create_view,
    task_update_view,
    task_delete_view,
)

app_name = "api"
urlpatterns = [
    path('tasks/', task_list_view, name="all-tasks"),
    path('tasks/create/', task_create_view, name="task-create"),
    path('tasks/<int:pk>/', task_view, name="task-details"),
    path('tasks/<int:pk>/edit/', task_update_view, name="task-edit"),
    path('tasks/<int:pk>/delete/', task_delete_view, name="task-delete"),
]

