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
        company_resp = supabase.table("companies").select("id").match({"company_name": company_name}).execute()

        if len(company_resp.data) != 1 or 'id' not in company_resp.data[0]:
            return standard_resp({}, status.HTTP_404_NOT_FOUND, "Company not found.")
        
        # Slow:
        company_id = company_resp.data[0]['id']
        notes_resp = supabase.table("get_company_notes").select("*").match({"visibility": "PUBLIC", "company_name": company_name}).execute()
        problems_resp = supabase.table("get_company_problems").select("*").match({"company_name": company_name}).execute()
        levels_resp = supabase.table("levels").select("*").match({"company_id": company_id}).execute()

        company_data = {
            "notes": notes_resp.data,
            "problems": problems_resp.data,
            "levels": levels_resp.data
        }
        
        return standard_resp(data=company_data, status_code=status.HTTP_200_OK)
    except APIError as err:
        msg = f"{err.code} - {err.message}"
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, msg)
    except Exception as ex: # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
