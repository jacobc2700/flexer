import json
from json import JSONDecodeError
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from postgrest import APIError

from utils import is_pass_valid, standard_resp
from flexer import supabase, logger


def get(_request: HttpRequest, _path_params = None) -> Response:
    """get all users in users table"""

    try:
        resp = supabase.table("users").select("*").execute()
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def post(request: HttpRequest, _path_params = None) -> Response:
    """create a single new user"""

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

        resp = supabase.table("users").insert(new_user_object).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_201_CREATED)

    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except ValueError as err:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, str(err))
    except APIError as err:
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR)
