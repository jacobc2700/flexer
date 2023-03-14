from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpRequest
from utils import exec_method

from .methods import users as users_methods
from .methods import identifier as identifier_methods

# /users
# GET: view all registered users
# POST: creates a new user
# Request body:
# {
#    "email": "jacob@gmail.com",
#    "password": "asdasda",
#    "username": "asdasda",
#    "first_name": "asdasda",
#    "last_name": "asdasda"
# }
# http://127.0.0.1:8000/users/


@api_view(['GET', 'POST'])
def users(request: HttpRequest) -> Response:
    """
    GET: get all users
    POST: create a single user
    """
    return exec_method(request, None, users_methods.get, users_methods.post)

# GET: gets data back about a single user
# PATCH: update an existing user by their id, specifying any number of parameters to update in the body
# Request body for PATCH:
# {
#    "email": "jacob@gmail.com",
#    "password": "asdasda",
#    "username": "asdasda",
#    "first_name": "asdasda",
#    "last_name": "asdasda"
# }
# DELETE: deletes a user by their id
# http://127.0.0.1:8000/users/id/
# http://127.0.0.1:8000/users/a714d173-5240-4630-a842-ae0ab9a076ba/


@api_view(['GET', 'PATCH', 'DELETE'])
def identifier(request: HttpRequest, id: str):
    """
    GET: get a user by USERNAME
    PATCH: update a user's data by user ID
    DELETE: delete a user by user ID
    """
    return exec_method(request, {"identifier": id}, identifier_methods.get, None, identifier_methods.patch, identifier_methods.delete)
