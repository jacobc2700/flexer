from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpRequest
from utils import exec_method

from .methods import index as index_methods
# from .methods import identifier as identifier_methods


@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def index(request: HttpRequest) -> Response:
    """Get all notes of a user or Create/Delete/Update a note"""
    return exec_method(request, None, {'get': index_methods.get, 'post': index_methods.post, 'patch': index_methods.patch, 'delete': index_methods.delete})
