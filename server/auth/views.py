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
def GetUserById(request: HttpRequest, id: str) -> Response:
    return exec_method(request, {"identifier": id}, users_methods.GetUserById, None)

@api_view(['GET'])
def GetUserByEmailAddress(request: HttpRequest, email_address: str) -> Response:
    return exec_method(request, {"identifier": email_address}, users_methods.GetUserByEmailAddress, None)

@api_view(['GET'])
def GetUserByAccount(request: HttpRequest, provider: str, providerAccountId: str) -> Response:
    return exec_method(request, {"provider": provider, "providerAccountId": providerAccountId}, accounts_methods.GetUserByAccount, None)

@api_view(['POST'])
def LinkAccount(request: HttpRequest) -> Response:
    return exec_method(request, None, None, accounts_methods.LinkAccount)

@api_view(['DELETE'])
def UnlinkAccount(request: HttpRequest) -> Response:
    return exec_method(request, DELETE=accounts_methods.UnlinkAccount)

@api_view(['POST'])
def GeneralSession(request: HttpRequest) -> Response:
    return exec_method(request, POST=sessions_methods.CreateSession)

@api_view(['GET', 'DELETE', 'POST'])
def SpecificSession(request: HttpRequest, sessionToken: str) -> Response:
    return exec_method(request, {"sessionToken": sessionToken}, GET=sessions_methods.GetSession, POST=sessions_methods.UpdateSession, DELETE=sessions_methods.DeleteSession)

@api_view(['POST', 'DELETE'])
def HandleToken(request: HttpRequest) -> Response:
    return exec_method(request, POST=tokens_methods.CreateToken, DELETE=tokens_methods.DeleteToken)

# @api_view(['DELETE'])
# def DeleteToken(request: HttpRequest) -> Response:
#     return exec_method(request, DELETE=tokens_methods.DeleteToken)