''' This module handles the implementation for the methods for the /users/ endpoint. '''
from typing import TypedDict
from json import JSONDecodeError
import json
from django.http import HttpRequest
from rest_framework import status
from rest_framework.response import Response
from postgrest import APIError

from utils import is_pass_valid, standard_resp
from flexer import supabase, logger

class PathParams(TypedDict):
    """
    GET -> identifer = username,
    PATCH & DELETE -> identifer = id
    """
    identifier: str

# http://127.0.0.1:8000/users/username/
def get(_request: HttpRequest, path_params: PathParams) -> Response:
    """ Get a user by username. """

    username = None if "identifier" not in path_params else path_params["identifier"]

    if not username:
        return standard_resp({}, status.HTTP_400_BAD_REQUEST, "Missing username.")

    try:
        resp = supabase.table("users").select("*").limit(1).match({'username': path_params["identifier"]}).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)
        return standard_resp(data=resp.data, status_code=status.HTTP_200_OK)
    except APIError as err:
        msg = f"{err.code} - {err.message}"
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, msg)
    except Exception as ex: # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)

# http://127.0.0.1:8000/users/id/ with [request body]
def patch(request: HttpRequest, path_params: PathParams) -> Response:
    """ Update a user by ID (specifying any number of parameters to update in the body). """

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        user_object_changes = {}

        if 'email' in body:
            user_object_changes['email'] = body['email']
        
        if 'password' in body:
            if not is_pass_valid(path_params['identifier']):
                raise ValueError('Password must be at least 6 characters.')
            user_object_changes['password'] = body['password']
        if 'username' in body:
            user_object_changes['username'] = body['username']
        if 'first_name' in body:
            user_object_changes['first_name'] = body['first_name']
        if 'last_name' in body:
            user_object_changes['last_name'] = body['last_name']

        try:
            resp = supabase.table("users").update(
                user_object_changes).eq("id", path_params["identifier"]).execute()

            if len(resp.data) != 1:
                return standard_resp(None, status.HTTP_200_OK)
            return standard_resp(data=resp.data[0], status_code=status.HTTP_200_OK)
        except APIError as err:
            msg = f"{err.code} - {err.message}"
            return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, msg)
        except Exception as ex: # pylint: disable=broad-except
            logger.exception(ex)
            return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)

    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except ValueError as err:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, str(err))
    except APIError as err:
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex: # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR)


def delete(_request: HttpRequest, path_params: PathParams) -> Response:
    """delete user by user id"""

    try:
        resp = supabase.table("users").delete().eq(
            "id", path_params["identifier"]).execute()

        if len(resp.data) == 0: # intentially didn't use != -1
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_200_OK)
    except APIError as err:
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex: # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR)
