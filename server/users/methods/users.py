from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
import json
from json import JSONDecodeError

from flexer import supabase
from utils import standard_resp


def GET(request: HttpRequest) -> Response:
    data = supabase.table("users").select("*").limit(5).execute()
    return standard_resp(data, status.HTTP_200_OK)


def POST(request: HttpRequest) -> Response:
    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        new_user_object = {
            'email': body['email'],
            'password': body['password'],
            'username': body['username'],
            'first_name': body['first_name'],
            'last_name': body['last_name']
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

        return Response({'success': 'created a new user today'}, status=status.HTTP_201_CREATED)
    
    except JSONDecodeError:
        return Response(status=status.HTTP_400_BAD_REQUEST)
