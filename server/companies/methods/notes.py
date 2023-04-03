import re
from typing import TypedDict
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from postgrest import APIError

from utils import standard_resp
from flexer import supabase, logger

class PathParams(TypedDict):
    """
    GET: company_name.
    """
    company_name: str

def get_notes(_request: HttpRequest, path_params: PathParams) -> Response:
    """
    Gets all notes associated with a company
    """

    try:
        company_name = None if "company_name" not in path_params else path_params["company_name"]

        if not company_name:
            return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Missing company name.")

        # remove unneccessary whitespace and make uppercase
        company_name = company_name.strip().upper()
        company_name = re.sub('\s+', ' ', company_name)

        resp = supabase.table("get_company_notes").select(
            "*").match({"company_name": company_name}).execute()

        return standard_resp(resp.data, status.HTTP_200_OK)
    except ValueError as err:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, str(err))
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex: # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)