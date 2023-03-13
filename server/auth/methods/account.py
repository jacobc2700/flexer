from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
import json
from json import JSONDecodeError
from postgrest import APIError

from typing import TypedDict

from flexer import auth_supabase, logger, supabase
from utils import is_pass_valid, standard_resp


class PathParams(TypedDict):
    # GET -> identifer = username,
    # PATCH & DELETE -> identifer = id
    providerAccountId: str
    provider: str

# getUser(id)
# http://localhost:8000/auth/5038bdc3-1d93-470c-a3bf-f57e8558762d
def GetUserByAccount(request: HttpRequest, path_params: PathParams) -> Response:
    print(path_params)
    try:
        # resp = supabase.from_("next_auth.accousnts").select("*").execute()
        resp = supabase.table("accounts").select("users (*)").match({ 'provider': path_params['provider'],
            'providerAccountId': path_params['providerAccountId'] }).execute()
        # resp = supabase.table("accounts").select(`provider, providerAccountId, users (*)`)
        # resp = supabase.table("accounts").select(
        #     "*").limit(1).match({'id': path_params["identifier"]}).execute()
        print("WHO")
        print(resp)
        print("DOG")

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        # print(len(resp))
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        # logger.exception(ex)
        print(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
    

def LinkAccount(request: HttpRequest, path_params: PathParams) -> Response:
    # print(path_params)
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    
    # account = {
    #     id?: string
    #     type?: string | null
    #     provider?: string | null
    #     providerAccountId?: string | null
    #     refresh_token?: string | null
    #     access_token?: string | null
    #     expires_at?: number | null
    #     token_type?: string | null
    #     scope?: string | null
    #     id_token?: string | null
    #     session_state?: string | null
    #     oauth_token_secret?: string | null
    #     oauth_token?: string | null
    #     userId?: string | null
    # }


    # }

    # TODO: must validate all the fields are present within account object.
    
    try:
        # resp = supabase.from_("next_auth.accousnts").select("*").execute()
        resp = supabase.table("accounts").insert(body['account']).execute()
        # resp = supabase.table("accounts").select(`provider, providerAccountId, users (*)`)
        # resp = supabase.table("accounts").select(
        #     "*").limit(1).match({'id': path_params["identifier"]}).execute()
        print("WHO")
        print(resp)
        print("DOG")
        # supabase.from("accounts").insert(account)
        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        # print(len(resp))
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        # logger.exception(ex)
        print(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
    

def UnlinkAccount(request: HttpRequest, path_params: PathParams) -> Response:
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    try:
        # resp = supabase.from_("next_auth.accousnts").select("*").execute()
        resp = supabase.table("accounts").delete().match({ 'provider': body['provider'],
            'providerAccountId': body['providerAccountId'] }).execute()
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
    
