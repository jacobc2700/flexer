from rest_framework.response import Response
from rest_framework.decorators import api_view
from supabase import create_client, Client
from dotenv import load_dotenv
import os
import json

load_dotenv('.env.local')

# /users
# view all registered users, creates a new user
@api_view(['GET', 'POST'])
def get_all_users(request):
    if request.method == 'GET':
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_KEY")
        supabase: Client = create_client(url, key)
        data = supabase.table("users").select("*").limit(5).execute()
        # assert len(data.data) > 0
        # return {'success': 'success'}
        return Response(data)
    elif request.method == 'POST':
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_KEY")
        supabase: Client = create_client(url, key)
        data = supabase.table("users").select("*").limit(5).execute()
        email = request.body.get('email', None)
        password = request.body.get('password', None)
        username = request.body.get('username', None)
        first_name = request.body.get('first_name', None)
        last_name = request.body.get('last_name', None)

        new_user_object = {
            'data': data,
            'email': email,
            'password': password,
            'username': username,
            'first_name': first_name,
            'last_name': last_name
        }

        user = supabase.auth.sign_up(new_user_object)
        data = supabase.table("users").insert(new_user_object).execute()
        print("new user", user)
        assert len(data.data) > 0
        return Response(data)
        # return {'success': 'success'}
    return Response(data)

# # /users/delete
# # delete a user
# @api_view(['DELETE'])
# def get_company(request, company_name):
#     url = os.environ.get("SUPABASE_URL")
#     key = os.environ.get("SUPABASE_KEY")

#     supabase: Client = create_client(url, key)
#     data = supabase.table("levels").select("*").limit(5).match({'company': company_name}).execute()

#     assert len(data.data) > 0
#     return Response(data)

# # /users/update
# # update an existing user

# /users
# create a new user
# @api_view(['POST'])
# def create_new_user(request):
#     url = os.environ.get("SUPABASE_URL")
#     key = os.environ.get("SUPABASE_KEY")
#     supabase: Client = create_client(url, key)
#     data = supabase.table("users").select("*").limit(5).execute()
#     email = request.query_params.get('email', None)
#     password = request.query_params.get('password', None)
#     username = request.query_params.get('username', None)
#     first_name = request.query_params.get('first_name', None)
#     last_name = request.query_params.get('last_name', None)

#     new_user_object = {
#         'data': data,
#         'email': email,
#         'password': password,
#         'username': username,
#         'first_name': first_name,
#         'last_name': last_name
#     }

#     user = supabase.auth.sign_up(new_user_object)
#     data = supabase.table("users").insert(new_user_object).execute()
#     print("new user", user)
#     assert len(data.data) > 0
#     return Response(data)