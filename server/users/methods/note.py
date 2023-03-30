from typing import TypedDict
from django.http import HttpRequest
from rest_framework import status
from rest_framework.response import Response
from postgrest import APIError

from utils import standard_resp
from flexer import supabase, logger

class PathParams(TypedDict):
    """
    GET -> username,
    """
    username: str

def get(_request: HttpRequest, path_params: PathParams) -> Response:
    """ Get all notes associated with a username. """

    try:
        username = None if "username" not in path_params else path_params["username"]

        if not username:
            return standard_resp({}, status.HTTP_400_BAD_REQUEST, "Missing username.")

        resp = supabase.table("get_user_notes").select("*").match({'username': username}).execute()

        return standard_resp(data=resp.data, status_code=status.HTTP_200_OK)
    except APIError as err:
        msg = f"{err.code} - {err.message}"
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, msg)
    except Exception as ex: # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)