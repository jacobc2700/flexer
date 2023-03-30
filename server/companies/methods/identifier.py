''' This module handles the implementation for the methods for the /companies/[identifier] endpoint. '''
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
    GET: identifer = company name.
    """
    identifier: str

# http://127.0.0.1:8000/companies/company_name/
def get(_request: HttpRequest, path_params: PathParams) -> Response:
    """ Get a company by name. """

    company_name = None if "identifier" not in path_params else path_params["identifier"]

    if not company_name:
        return standard_resp({}, status.HTTP_400_BAD_REQUEST, "Missing company name.")

    try:
        resp = supabase.table("get_companies").select("*").limit(1).eq("name", company_name).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)
        return standard_resp(data=resp.data, status_code=status.HTTP_200_OK)
    except APIError as err:
        msg = f"{err.code} - {err.message}"
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, msg)
    except Exception as ex: # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
