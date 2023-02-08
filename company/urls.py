from django.urls import include, path
from .views import CompanyList

urlpatterns = [
    path('', CompanyList.as_view()),
]