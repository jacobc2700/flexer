from django.shortcuts import render
from .models import Company
from rest_framework import generics
from .serializers import CompanySerializer

# Create your views here.
class CompanyList(generics.ListAPIView):
    # API endpoint that allows customer to be viewed.
    queryset = Company.objects.all()
    serializer_class = CompanySerializer