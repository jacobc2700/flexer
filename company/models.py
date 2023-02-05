from django.db import models

class Company(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.CharField("timestamp", max_length=240)
    company = models.CharField("timestamp", max_length=240)
    level = models.CharField("timestamp", max_length=240)
    title = models.CharField("timestamp", max_length=240)
    totalyearlycompensation = models.CharField("timestamp", max_length=240)
    location = models.CharField("timestamp", max_length=240)
    yearsofexperience = models.CharField("timestamp", max_length=240)
    yearsatcompany = models.CharField("timestamp", max_length=240)
    tag = models.CharField("timestamp", max_length=240)
    basesalary = models.CharField("timestamp", max_length=240)
    stockgrantvalue = models.CharField("timestamp", max_length=240)
    bonus = models.CharField("timestamp", max_length=240)
    gender = models.CharField("timestamp", max_length=240)
    otherdetails = models.CharField("timestamp", max_length=240)
    cityid = models.CharField("timestamp", max_length=240)
    dmaid = models.CharField("timestamp", max_length=240)
    rowNumber = models.CharField("timestamp", max_length=240)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.company