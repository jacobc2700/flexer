import json
from json import JSONDecodeError
from typing import TypedDict
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from postgrest import APIError

from utils import standard_resp
from flexer import supabase, logger


class PathParams(TypedDict):
    """
    only used by get_session
    """
    session_token: str

# TODO: rename to get_session_and_user
def get_session(_request: HttpRequest, path_params: PathParams) -> Response:
    """TODO: is this some kind of validation?"""

    try:
        resp = supabase.table("sessions").select(
            "*, users (*)").eq("sessionToken", path_params['session_token']).execute()

        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


# {/
    # "sessionToken": "abc",
    # "userId": "5038bdc3-1d93-470c-a3bf-f57e8558762d",
    # "expires": "2011-01-01 00:00:00"
# }
def create_session(request: HttpRequest, _path_params: PathParams) -> Response:
    """Create a new session for a user"""

    # ??????
    # def toISOString(date):
    #     return date.strftime("%Y-%m-%dT%H:%M:%SZ")

    # expires?: string | null
    #       sessionToken?: string | null
    #       userId?: string | null
    #       id?: string

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body)
        session_token = body['sessionToken']
        user_id = body['userId']
        expires = body['expires']
        print(body)

        resp = supabase.table("sessions").insert(
            {'sessionToken': session_token, 'userId': user_id, "expires": expires}).execute()

        return standard_resp(resp.data, status.HTTP_200_OK)
    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def update_session(request: HttpRequest, path_params: PathParams) -> Response:
    """TODO: what does this do exactly?"""

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    session_token = path_params['session_token']
    user_id = body['user_id']
    expires = body['expires']

    # ??????
    # def toISOString(date):
    #     return date.strftime("%Y-%m-%dT%H:%M:%SZ")

    # expires?: string | null
    #       sessionToken?: string | null
    #       userId?: string | null
    #       id?: string

    try:
        resp = supabase.table("sessions").update(
            {'userId': user_id, "expires": expires}).eq('sessionToken', session_token).execute()

        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def delete_session(_request: HttpRequest, path_params: PathParams) -> Response:
    """Delete a session by sessionToken from the sessions table."""

    session_token = path_params['session_token']

    try:
        resp = supabase.table("sessions").delete().eq(
            "sessionToken", session_token).execute()
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
