from rest_framework.response import Response
from rest_framework.decorators import api_view
from supabase import create_client, Client
from dotenv import load_dotenv
import os
import json

# TO DO: stop repeating the "url, key, supabase" code
# needs more validation for what is passed in the body, better responses + error handles
load_dotenv('.env.local')

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
def users(request):
    if request.method == 'GET':
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_KEY")
        supabase: Client = create_client(url, key)
        data = supabase.table("users").select("*").limit(5).execute()
        return Response(data)
    elif request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_KEY")
        supabase: Client = create_client(url, key)
        email = body['email']
        password = body['password']
        username = body['username']
        first_name = body['first_name']
        last_name = body['last_name']

        new_user_object = {
            'email': email,
            'password': password,
            'username': username,
            'first_name': first_name,
            'last_name': last_name
        }

        auth_response = supabase.auth.sign_up(new_user_object)
        # id, created at - properties we need generated from Supabase:
        id_supabase = auth_response.user.id
        created_at_supabase = auth_response.user.created_at.isoformat()

        new_user_object['id'] = id_supabase
        new_user_object['created_at'] = created_at_supabase
        new_user_object['updated_at'] = created_at_supabase

        # print(user['user_id'])
        data = supabase.table("users").insert(new_user_object).execute()

    return Response({'success': 'created a new user today'})

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
def user(request, id):
    if request.method == 'GET':
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_KEY")

        supabase: Client = create_client(url, key)
        data = supabase.table("users").select("*").limit(1).match({'id': id}).execute()
        return Response(data)
    elif request.method == 'POST':
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_KEY")
        supabase: Client = create_client(url, key)
        data = supabase.table("users").select("*").limit(5).execute()
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

        data = supabase.table("users").update(user_object_changes).eq("id", id).execute()
        return Response({"success": "updated user info for user with id " + str(id)})
    elif request.method == 'DELETE':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_KEY")
        supabase: Client = create_client(url, key)
        data = supabase.table("users").delete().eq("id", id).execute()
        return Response({'success': 'deleted user with id ' + str(id)})
    return Response({'generic': 'hello'})

# DELETE
# # /users/delete
# # deletes a user by their id
# # http://127.0.0.1:8000/users/id/delete
# @api_view(['DELETE'])
# def delete_user(request, id):
#     body_unicode = request.body.decode('utf-8')
#     body = json.loads(body_unicode)
#     url = os.environ.get("SUPABASE_URL")
#     key = os.environ.get("SUPABASE_KEY")
#     supabase: Client = create_client(url, key)
#     data = supabase.table("users").delete().eq("id", id).execute()
#     return Response({'success': 'deleted user with id ' + str(id)})

# /users/update
# update an existing user by their id, specifying any number of parameters to update in the body
# Request body:
# {
#    "email": "jacob@gmail.com",
#    "password": "asdasda",
#    "username": "asdasda",
#    "first_name": "asdasda",
#    "last_name": "asdasda"
# }
# http://127.0.0.1:8000/users/id/update
# @api_view(['POST'])
# def update_user(request):
#     url = os.environ.get("SUPABASE_URL")
#     key = os.environ.get("SUPABASE_KEY")
#     supabase: Client = create_client(url, key)
#     data = supabase.table("users").select("*").limit(5).execute()
#     body_unicode = request.body.decode('utf-8')
#     body = json.loads(body_unicode)

#     user_object_changes = {}
    
#     if 'email' in body:
#         user_object_changes['email'] = body['email']
#     if 'password' in body:
#         user_object_changes['password'] = body['password']
#     if 'username' in body:
#         user_object_changes['username'] = body['username']
#     if 'first_name' in body:
#         user_object_changes['first_name'] = body['first_name']
#     if 'last_name' in body:
#         user_object_changes['last_name'] = body['last_name']

#     data = supabase.table("users").update(user_object_changes).eq("id", body['id']).execute()
#     return Response({"success": "updated user info for user with id " + str(id)})