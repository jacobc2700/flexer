from django.urls import path
from . import views

urlpatterns = [
    # path('', views.users),
    # path('<str:id>', views.identifier),
    path('', views.index),
    # path('<str:note_id>/', views.by_id),
    # path('<str:note_title>', views.by_company),
    # path('<str:note_title>', views.by_title),
]