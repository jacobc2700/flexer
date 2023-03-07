from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_companies),
    path('<str:company_name>/', views.get_company)
]