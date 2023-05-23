''' This module handles the implementation for the methods for the /problems/ endpoint. '''
import json
from json import JSONDecodeError
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from postgrest import APIError

from utils import is_pass_valid, standard_resp
from flexer import supabase, logger

# http://127.0.0.1:8000/problems/
def problems(request: HttpRequest, _path_params = None) -> Response:
    """ Get all the problems. """


    try:
        all_problems = supabase.table("problems").select("*").execute().data

        fav_problems_ids = []
        session_tok = request.COOKIES.get("session-token")

        if session_tok is not None:
            session = supabase.table("sessions").select(
                '*', count="exact").eq("sessionToken", session_tok).execute()

            if session.count == 1:
                fav_problems_ids = supabase.table("favorite_problems").select(
                    "problem_id").eq("user_id", session.data[0]["userId"]).execute().data

        return standard_resp({"problems": all_problems, "favorites": fav_problems_ids}, status.HTTP_200_OK)
    except APIError as err:
        error_message = f"{err.code} - {err.message}"
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, error_message)
    except Exception as ex: # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
