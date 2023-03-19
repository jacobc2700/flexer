from django.urls import path
from . import views

# TODO: some thins have slash but some don't?
urlpatterns = [
    path('id/<str:id>', views.get_user_by_id),
    path('email-address/<str:email_address>', views.get_user_by_email_address),
    path('getUserByAccount/<str:provider>/<str:provider_account_id>', views.get_user_by_account),
    path('linkAccount', views.link_account),
    path('unlinkAccount', views.unlink_account),
    path('session', views.create_session),
    path('session/<str:session_token>', views.specific_session),
    path('token', views.handle_token),
]