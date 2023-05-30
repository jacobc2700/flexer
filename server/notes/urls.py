from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('explore', views.public),
    path('<str:id>', views.identifier)
]