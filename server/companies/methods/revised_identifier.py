''' This module handles the implementation for the methods for the /companies/[identifier] endpoint. '''
from typing import TypedDict
from django.http import HttpRequest
from rest_framework import status
from rest_framework.response import Response
from postgrest import APIError

from utils import standard_resp
from flexer import supabase, logger


class PathParams(TypedDict):
    """
    GET: identifer = company name.
    """
    identifier: str

# http://127.0.0.1:8000/companies/company_name/


def get(request: HttpRequest, path_params: PathParams) -> Response:
    """ Get a company by name. """

    company_name = None if "identifier" not in path_params else path_params["identifier"]

    if not company_name:
        return standard_resp({}, status.HTTP_400_BAD_REQUEST, "Missing company name.")

    try:
        company_resp = supabase.table("companies").select(
            "*").match({"company_name": company_name}).execute()

        if len(company_resp.data) != 1 or 'id' not in company_resp.data[0]:
            return standard_resp({}, status.HTTP_404_NOT_FOUND, "Company not found.")

        # The number of DB calls here is not ideal (probably kinda slow):
        company_id = company_resp.data[0]['id']
        problems_resp = supabase.table("get_company_problems").select(
            "*").match({"company_name": company_name}).execute()
        levels_resp = supabase.table("levels").select(
            "*").match({"company_id": company_id}).execute()

        # check for session token
        session_tok = request.COOKIES.get("session-token")
        non_public_notes = []
        public_notes = []
        session = None

        if session_tok is not None:
            session = supabase.table("sessions").select(
                '*', count="exact").eq("sessionToken", session_tok).execute()

            if session.count == 1:
                # notes by this user that are any visibility
                non_public_notes = supabase.table("get_company_notes").select(
                    "*").match({"company_name": company_name, "user_id": session.data[0]['userId']}).execute().data

        # if the session exists, remove all the notes by this user in this call
        # if the session DNE, just get all the public notes

        public_notes = supabase.table("get_company_notes").select(
            "*").match({"visibility": "PUBLIC", "company_name": company_name})

        if session and session.count == 1:
            public_notes = public_notes.neq('user_id', session.data[0]['userId'])

        public_notes = public_notes.execute().data

        company_data = {
            "company": company_resp.data[0],
            "notes": non_public_notes + public_notes,
            "problems": problems_resp.data,
            "levels": levels_resp.data,
            "isFavorite": False,
        }

        if session and session.count == 1:
            fav_resp = supabase.table("favorite_companies").select(
                "*", count="exact").match({"user_id": session.data[0]['userId'], "company_id": company_id}).execute()
            if fav_resp.count == 1:
                company_data["isFavorite"] = True

        return standard_resp(data=company_data, status_code=status.HTTP_200_OK)
    except APIError as err:
        msg = f"{err.code} - {err.message}"
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, msg)
    except Exception as ex:  # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
