from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from django.http import HttpRequest

from flexer import supabase
from utils import exec_method

from .methods.users import GET, POST

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
    return exec_method(request, None, GET, POST)

# GET: gets data back about a single user
# POST: update an existing user by their id, specifying any number of parameters to update in the body
# Request body for POST:
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


@api_view(['GET', 'POST', 'DELETE'])
def user_id(request, id):
    if request.method == 'GET':
        data = supabase.table("users").select(
            "*").limit(1).match({'id': id}).execute()
        return Response(data)
    elif request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        user_object_changes = {}

        if 'email' in body:
            user_object_changes['email'] = body['email']
        if 'password' in body:
            user_object_changes['password'] = body['password']
        if 'username' in body:
            user_object_changes['username'] = body['username']
        if 'first_name' in body:
            user_object_changes['first_name'] = body['first_name']
        if 'last_name' in body:
            user_object_changes['last_name'] = body['last_name']

        data = supabase.table("users").update(
            user_object_changes).eq("id", id).execute()
        return Response({"success": "updated user info for user with id " + str(id)})
    elif request.method == 'DELETE':
        try:
            data = supabase.table("users").delete().eq("id", id).execute()
        except Exception as ex:
            template = "An exception of type {0} occurred. Arguments:\n{1!r}"
            message = template.format(type(ex).__name__, ex.args)
            print(message)
        return Response({'success': 'deleted user with id ' + str(id)})
    return Response({'generic': 'hello'})
