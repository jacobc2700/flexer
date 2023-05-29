''' This module handles the implementation for the methods for the /notes/[id] endpoint '''
from typing import TypedDict
from django.http import HttpRequest
from rest_framework import status
from rest_framework.response import Response
from postgrest import APIError
from uuid import UUID

from utils import standard_resp
from flexer import supabase, logger


class PathParams(TypedDict):
    """
    GET: id = note id.
    """
    id: str


def get_by_id(request: HttpRequest, path_params: PathParams) -> Response:
    """get all the public notes"""

    try:
        note = None

        # check if the id is valid first
        try:
            UUID(str(path_params['id']))
        except ValueError:  # just return an empty json object if id is not a valid uuid
            # returns null if no note is found
            return standard_resp(note, status.HTTP_200_OK)

        session_tok = request.COOKIES.get("session-token")

        # if session exists, try to find a note that matches the user_id & note_id
        if session_tok is not None:
            session = supabase.table("sessions").select(
                '*', count="exact").eq("sessionToken", session_tok).execute()

            if session.count == 1:
                user_id = session.data[0]['userId']
                note = supabase.table("get_user_notes").select(
                    "*").match({"user_id": user_id, "note_id": path_params['id']}).execute().data[0]

        # if no session or no note found, try to find a public note that matches the note_id.
        if note is None:
            note = supabase.table("get_user_notes").select(
                "*").match({'visibility': 'PUBLIC', "note_id": path_params['id']}).execute().data[0]

        # returns null if no note is found
        return standard_resp(note, status.HTTP_200_OK)
    except ValueError as err:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, str(err))
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
