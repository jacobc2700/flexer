from typing import TypedDict
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from postgrest import APIError

from utils import standard_resp
from flexer import supabase, logger


class PathParams(TypedDict):
    """
    GET -> identifer = username,
    PATCH & DELETE -> identifer = id
    """
    identifier: str


def get_user_by_id(_request: HttpRequest, path_params: PathParams) -> Response:
    """
    get user data by id
    (http://localhost:8000/auth/5038bdc3-1d93-470c-a3bf-f57e8558762d)
    """

    try:
        resp = supabase.table("users").select(
            "*").limit(1).match({'id': path_params["identifier"]}).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_user_by_email_address(_request: HttpRequest, path_params: PathParams) -> Response:
    """get user account by email address"""

    try:
        resp = supabase.table("users").select(
            "*").limit(1).match({'email': path_params["identifier"]}).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
