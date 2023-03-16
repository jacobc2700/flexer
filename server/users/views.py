from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpRequest
from utils import exec_method

from .methods import users as users_methods
from .methods import identifier as identifier_methods




@api_view(['GET', 'POST'])
def users(request: HttpRequest) -> Response:
    """
    /users
    GET: view all registered users
    POST: creates a new user
    Request body:
    {
    "email": "jacob@gmail.com",
    "password": "asdasda",
    "username": "asdasda",
    "first_name": "asdasda",
    "last_name": "asdasda"
    }
    http://127.0.0.1:8000/users/
    """
    return exec_method(request, None, users_methods.get, users_methods.post)


@api_view(['GET', 'PATCH', 'DELETE'])
def identifier(request: HttpRequest, id: str):
    """
    GET: gets data back about a single user by USERNAME
    PATCH: update an existing user by their ID, specifying any number of parameters to update in the body
    DELETE: deletes a user by their ID
    Request body for PATCH:
    {
    "email": "jacob@gmail.com",
    "password": "asdasda",
    "username": "asdasda",
    "first_name": "asdasda",
    "last_name": "asdasda"
    }
    http://127.0.0.1:8000/users/id/
    http://127.0.0.1:8000/users/a714d173-5240-4630-a842-ae0ab9a076ba/
    """
    return exec_method(request, {"identifier": id}, identifier_methods.get, None, identifier_methods.patch, identifier_methods.delete)
