from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpRequest
from utils import exec_method

# HTTP method implementations for /auth/[name] routes.
from .methods import user as users_methods
from .methods import account as accounts_methods
from .methods import session as sessions_methods
from .methods import token as tokens_methods


@api_view(['GET'])
def get_user_by_id(request: HttpRequest, id: str) -> Response:
    """Gets user data by id"""
    return exec_method(request, {"identifier": id}, users_methods.get_user_by_id, None)


@api_view(['GET'])
def get_user_by_email_address(request: HttpRequest, email_address: str) -> Response:
    """Gets user data by email address"""
    return exec_method(request, {"identifier": email_address}, users_methods.get_user_by_email_address, None)


@api_view(['GET'])
def get_user_by_account(request: HttpRequest, provider: str, provider_account_id: str) -> Response:
    """
    Get user data by their account.
    An account contains the method the user uses to login. A single user may have multiple accounts.
    """
    return exec_method(request, {"provider": provider, "provider_account_id": provider_account_id}, accounts_methods.get_user_by_account, None)


@api_view(['POST'])
def link_account(request: HttpRequest) -> Response:
    """TODO: what does this do?"""
    return exec_method(request, post=accounts_methods.link_account)


@api_view(['DELETE'])
def unlink_account(request: HttpRequest) -> Response:
    """TODO: what does this do?"""
    return exec_method(request, delete=accounts_methods.unlink_account)


@api_view(['POST'])
def create_session(request: HttpRequest) -> Response:
    """creates a session for a user"""
    return exec_method(request, post=sessions_methods.create_session)


@api_view(['GET', 'DELETE', 'POST'])
def specific_session(request: HttpRequest, sessionToken: str) -> Response:
    """TODO: what do these do?"""
    return exec_method(request, {"session_token": sessionToken}, get=sessions_methods.get_session, post=sessions_methods.update_session, delete=sessions_methods.delete_session)


@api_view(['POST', 'DELETE'])
def handle_token(request: HttpRequest) -> Response:
    """TODO: what do these do?"""
    return exec_method(request, post=tokens_methods.create_token, delete=tokens_methods.delete_token)
