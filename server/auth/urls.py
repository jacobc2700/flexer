from django.urls import path
from . import views

urlpatterns = [
    path('id/<str:id>', views.GetUserById),
    path('email-address/<str:email_address>', views.GetUserByEmailAddress),
    path('getUserByAccount/<str:provider>/<str:providerAccountId>', views.GetUserByAccount),
    path('linkAccount', views.LinkAccount),
    path('unlinkAccount', views.UnlinkAccount),
    path('session', views.GeneralSession),
    path('session/<str:sessionToken>', views.SpecificSession),
    path('token', views.HandleToken),
]