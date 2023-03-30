''' This module contains the URL endpoints for users. '''
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpRequest
from utils import exec_method

from .methods import users as users_methods
from .methods import identifier as identifier_methods
from .methods import note as note_methods
from .methods import note_id as note_id_methods


@api_view(['GET', 'POST'])
def users(request: HttpRequest) -> Response:
    """
    /users
    GET: view all registered users.
    POST: creates a new user (specify any subset of parameters in the request body):
    {
        "email": "name@gmail.com",
        "password": "12345",
        "username": "bob",
        "first_name": "billy",
        "last_name": "bobby"
    }

    http://127.0.0.1:8000/users/ (GET)
    http://127.0.0.1:8000/users/ with [request body] (POST)
    """

    methods = {
        'get': users_methods.get,
        'post': users_methods.post
    }

    return exec_method(request=request, path_params=None, methods=methods)


@api_view(['GET', 'PATCH', 'DELETE'])
def identifier(request: HttpRequest, id: str):  # pylint: disable=redefined-builtin disable=invalid-name
    """
    /users/username
    GET: gets data back about a single user by username.

    /users/id
    PATCH: update user by ID (specifying any number of parameters to update in the body):
    {
        "email": "name@gmail.com",
        "password": "12345",
        "username": "bob",
        "first_name": "billy",
        "last_name": "bobby"
    }

    /users/id
    DELETE: deletes an existing user by their ID.

    http://127.0.0.1:8000/users/username/ (GET)
    http://127.0.0.1:8000/users/id/ with [request body] (PATCH)
    http://127.0.0.1:8000/users/id/ (DELETE)
    """

    path_params = {
        "identifier": id
    }

    methods = {
        'get': identifier_methods.get,
        'patch': identifier_methods.patch,
        'delete': identifier_methods.delete
    }

    return exec_method(request=request, path_params=path_params, methods=methods)


@api_view(['GET'])
def notes(request: HttpRequest, username: str):  # pylint: disable=redefined-builtin disable=invalid-name
    """
    /users/username/notes
    GET: gets all notes for a user by username.
    """

    path_params = {'username': username}
    methods = {'get': note_methods.get}

    return exec_method(request, path_params, methods)

@api_view(['GET'])
def note_by_id(request: HttpRequest, username: str, note_id: str):  # pylint: disable=redefined-builtin disable=invalid-name
    """
    /users/username/notes/note_id
    GET: gets a single note by ID.
    """
    
    path_params = {'username': username, 'note_id': note_id}
    methods = {'get': note_id_methods.get}

    return exec_method(request, path_params, methods)