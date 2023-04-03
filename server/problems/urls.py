'''todo.urls.py'''
from django.urls import path
from . import views

urlpatterns = [
    path('', views.problems),
    path('<str:id>/', views.identifier),
    path('<str:id>/notes/', views.notes_for_problem),
    path('<str:id>/companies/', views.companies_for_problem),
]