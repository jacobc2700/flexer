from rest_framework import serializers
from .models import Company
 
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company 
        fields = ['timestamp', 'company', 'level', 'title', 'totalyearlycompensation',
        'location', 'yearsofexperience', 'yearsatcompany', 'tag', 'basesalary', 'stockgrantvalue',
        'bonus', 'gender', 'otherdetails', 'cityid', 'dmaid', 'rowNumber', 'created']
        