from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpRequest
from utils import exec_method

from .methods import index as index_methods
from .methods import identifier as identifier_methods
from .methods import public as public_methods


@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def index(request: HttpRequest) -> Response:
    """Get all notes of a user or Create/Delete/Update a note"""
    return exec_method(request, None, {'get': index_methods.get, 'post': index_methods.post, 'patch': index_methods.patch, 'delete': index_methods.delete})

@api_view(['GET'])
def public(request: HttpRequest) -> Response:
    """Get all public notes"""
    return exec_method(request, None, {'get': public_methods.get})

@api_view(['GET'])
def identifier(request: HttpRequest, id: str) -> Response:
    """Get a note by note_id"""
    path_params = {
        "id": id
    }

    return exec_method(request, path_params, {'get': identifier_methods.get_by_id})
