from django.urls import path
from . import views

urlpatterns = [
    path('', views.users),
    path('<str:identifier>', views.identifier),
]