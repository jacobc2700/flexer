''' This module handles the implementation for the methods for the /companies/ endpoint. '''
import json
from json import JSONDecodeError
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from postgrest import APIError

from utils import is_pass_valid, standard_resp
from flexer import supabase, logger

# http://127.0.0.1:8000/companies/
def get(_request: HttpRequest, _path_params = None) -> Response:
    """ Get all companies in the same table. """

    try:
        resp = supabase.table("get_companies").select("*").execute()
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        error_message = f"{err.code} - {err.message}"
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, error_message)
    except Exception as ex: # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)