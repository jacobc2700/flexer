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
    only used by get_session_and_user
    """
    session_token: str


def get_session_and_user(_request: HttpRequest, path_params: PathParams) -> Response:
    """get user associated with a session (joins user & session)"""

    try:
        resp = supabase.table("sessions").select(
            "*, users (*)").eq("sessionToken", path_params['session_token']).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        print(resp.data[0])

        return standard_resp(resp.data[0], status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def create_session(request: HttpRequest, _path_params: PathParams) -> Response:
    """Create a new session for a user"""

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        session_token = body['sessionToken']
        user_id = body['userId']
        expires = body['expires']

        resp = supabase.table("sessions").insert(
            {'sessionToken': session_token, 'userId': user_id, "expires": expires}).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_200_OK)
    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def update_session(request: HttpRequest, path_params: PathParams) -> Response:
    """updates an existing session by updating the expires date"""

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    session_token = path_params['session_token']

    update_dict = {}
    if (body.get('user_id') != None):
        update_dict['user_id'] = body['user_id']
    if (body.get('expires') != None):
        update_dict['expires'] = body['expires']

    try:
        resp = supabase.table("sessions").update(update_dict).eq(
            'sessionToken', session_token).execute()

        if len(resp.data) == 0:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_200_OK)
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

        if len(resp.data) == 0:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
