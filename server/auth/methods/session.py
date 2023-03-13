from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
import json
from json import JSONDecodeError
from postgrest import APIError
import datetime

from typing import TypedDict

from flexer import auth_supabase, logger, supabase
from utils import is_pass_valid, standard_resp


class PathParams(TypedDict):
    # GET -> identifer = username,
    # PATCH & DELETE -> identifer = id
    providerAccountId: str
    provider: str

def GetSession(request: HttpRequest, path_params: PathParams) -> Response:
    # print(path_params)
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    sessionToken = body['sessionToken']
    userId = body['userId']
    expires = body['expires']

    # ??????
    def toISOString(date):
        return date.strftime("%Y-%m-%dT%H:%M:%SZ") 

    # expires?: string | null
    #       sessionToken?: string | null
    #       userId?: string | null
    #       id?: string


    try:
        # resp = supabase.from_("next_auth.accousnts").select("*").execute()
        resp = supabase.table("sessions").insert({'sessionToken': sessionToken, 'userId': userId, "expires": expires}).execute()
        # resp = supabase.table("accounts").select(`provider, providerAccountId, users (*)`)
        # resp = supabase.table("accounts").select(
        #     "*").limit(1).match({'id': path_params["identifier"]}).execute()
        print("WHO")
        print(resp)
        print("DOG")
        # supabase.from("accounts").insert(account)
        # if len(resp.data) != 1:
        #     return standard_resp(None, status.HTTP_200_OK)

        # print(len(resp))
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        # logger.exception(ex)
        print(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
    



# {/
    # "sessionToken": "abc",
    # "userId": "5038bdc3-1d93-470c-a3bf-f57e8558762d",
    # "expires": "2011-01-01 00:00:00"
# }
def CreateSession(request: HttpRequest, path_params: PathParams) -> Response:
    # print(path_params)
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    sessionToken = body['sessionToken']
    userId = body['userId']
    expires = body['expires']

    # ??????
    def toISOString(date):
        return date.strftime("%Y-%m-%dT%H:%M:%SZ") 

    # expires?: string | null
    #       sessionToken?: string | null
    #       userId?: string | null
    #       id?: string


    try:
        # resp = supabase.from_("next_auth.accousnts").select("*").execute()
        resp = supabase.table("sessions").insert({'sessionToken': sessionToken, 'userId': userId, "expires": expires}).execute()
        # resp = supabase.table("accounts").select(`provider, providerAccountId, users (*)`)
        # resp = supabase.table("accounts").select(
        #     "*").limit(1).match({'id': path_params["identifier"]}).execute()
        print("WHO")
        print(resp)
        print("DOG")
        # supabase.from("accounts").insert(account)
        # if len(resp.data) != 1:
        #     return standard_resp(None, status.HTTP_200_OK)

        # print(len(resp))
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        # logger.exception(ex)
        print(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
    
