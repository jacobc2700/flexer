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

def CreateToken(request: HttpRequest, path_params: PathParams) -> Response:
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

# id: number
#           identifier: string | null
#           token: string | null
#           expires: string | null

    # }

    # TODO: must validate all the fields are present within account object.
    
    try:
        # resp = supabase.from_("next_auth.accousnts").select("*").execute()
        resp = supabase.table("verification_tokens").insert(body['token']).execute()
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
    
def DeleteToken(request: HttpRequest, path_params: PathParams) -> Response:
    # print(path_params)
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    
    # account = {
    #     id?: string
    #     type?: string | null
    #     provider?: string | null
#  
# id: number
#           identifier: string | null
#           token: string | null
#           expires: string | null

    # }
    identifier = body['identifier']
    token = body['token']
    # TODO: must validate all the fields are present within account object.
    
    try:
        # resp = supabase.from_("next_auth.accousnts").select("*").execute()
        resp = supabase.table("verification_tokens").delete().match({"identifier": identifier, "token": token}).execute()
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