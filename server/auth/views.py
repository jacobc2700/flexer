from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from django.http import HttpRequest

from flexer import supabase
from utils import exec_method

from .methods import user as users_methods
# from .methods import identifier as identifier_methods

@api_view(['GET'])
def auth(request: HttpRequest) -> Response:
    return exec_method(request, None, users_methods.GET, None)

# @api_view(['GET', 'PATCH', 'DELETE'])
# def identifier(request: HttpRequest, identifier: str):
#     return exec_method(request, {"identifier": identifier}, identifier_methods.GET, None, identifier_methods.PATCH, identifier_methods.DELETE)
