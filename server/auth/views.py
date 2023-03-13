from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from django.http import HttpRequest

from flexer import auth_supabase
from utils import exec_method

from .methods import user as users_methods
from .methods import account as accounts_methods
from .methods import session as sessions_methods
# from .methods import identifier as identifier_methods

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

@api_view(['POST', 'DELETE'])
def Sessions(request: HttpRequest) -> Response:
    return exec_method(request, GET=session_methods.GetSession, POST=sessions_methods.CreateSession)

# @api_view(['GET', 'PATCH', 'DELETE'])
# def identifier(request: HttpRequest, identifier: str):
#     return exec_method(request, {"identifier": identifier}, identifier_methods.GET, None, identifier_methods.PATCH, identifier_methods.DELETE)
