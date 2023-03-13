from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
import json
from json import JSONDecodeError
from postgrest import APIError

from typing import TypedDict

from flexer import supabase, logger
from utils import is_pass_valid, standard_resp


class PathParams(TypedDict):
    # GET -> identifer = username,
    # PATCH & DELETE -> identifer = id
    identifier: str

# getUser(id)
# http://localhost:8000/auth/5038bdc3-1d93-470c-a3bf-f57e8558762d
def GetUserById(request: HttpRequest, path_params: PathParams) -> Response:
    # print(path_params)
    try:
        resp = supabase.table("users").select(
            "*").limit(1).match({'id': path_params["identifier"]}).execute()
        # print("WHO")
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        # logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# def 

# getUserByEmailByAddress
def GetUserByEmailAddress(request: HttpRequest, path_params: PathParams) -> Response:
    # print(path_params)
    try:
        resp = supabase.table("users").select(
            "*").limit(1).match({'email': path_params["identifier"]}).execute()
        # print("WHO")
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        # logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# createUser