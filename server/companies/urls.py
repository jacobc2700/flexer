''' This module contains the URL endpoints for companies. '''
from django.urls import path
from . import views

urlpatterns = [
    path('', views.companies),
    path('<str:id>', views.identifier),
    path('<str:company_name>/notes', views.company_notes)
]