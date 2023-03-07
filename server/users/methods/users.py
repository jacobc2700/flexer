from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
import json
from json import JSONDecodeError
from postgrest import APIError

from flexer import supabase, logger
from utils import is_pass_valid, standard_resp


def GET(request: HttpRequest, post_params = None) -> Response:
    try:
        resp = supabase.table("users").select("*").limit(5).execute()
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def POST(request: HttpRequest, post_params = None) -> Response:
    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        # TODO: validation (unique username/password)
        if not is_pass_valid(body['password']):
            raise ValueError('Password must be at least 6 characters')

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

        resp = supabase.table("users").insert(new_user_object).execute()

        return standard_resp(resp.data, status.HTTP_201_CREATED)

    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except ValueError as err:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, str(err))
    except APIError as err:
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR)
