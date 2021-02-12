from django.contrib import admin
from django.urls import path, include
from .views import (
    home_page_view,
)

app_name = "frontend"
urlpatterns = [
    path('', home_page_view, name="all-tasks"),
]

