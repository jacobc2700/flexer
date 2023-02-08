from django.urls import path
from . import views

# set api end points
urlpatterns = [
    path('', views.getData),
    path('<str:company_name>/', views.getSpecific)
]