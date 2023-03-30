from typing import TypedDict
from django.http import HttpRequest
from rest_framework import status
from rest_framework.response import Response
from postgrest import APIError

from utils import standard_resp
from flexer import supabase, logger


class PathParams(TypedDict):
    """
    GET -> username, note_id
    """
    username: str
    note_id: str


def get(_request: HttpRequest, path_params: PathParams) -> Response:
    """ Get single note associated with a username. """

    try:
        username = None if "username" not in path_params else path_params["username"]
        note_id = None if "note_id" not in path_params else path_params["note_id"]

        if not username or not note_id:
            return standard_resp({}, status.HTTP_400_BAD_REQUEST, "Missing path username/note_id.")

        resp = supabase.table("get_user_notes").select(
            "*").match({'username': username, 'note_id': note_id}).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(data=resp.data[0], status_code=status.HTTP_200_OK)
    except APIError as err:
        msg = f"{err.code} - {err.message}"
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, msg)
    except Exception as ex:  # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
