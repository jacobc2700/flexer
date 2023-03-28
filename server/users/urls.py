''' This module contains the URL endpoints for users. '''
from django.urls import path
from . import views

urlpatterns = [
    path('', views.users),
    path('<str:id>', views.identifier),
]