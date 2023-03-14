import json
from json import JSONDecodeError
from typing import TypedDict
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from postgrest import APIError

from utils import standard_resp
from flexer import supabase, logger


class PathParams(TypedDict):
    # GET -> identifer = username,
    # PATCH & DELETE -> identifer = id
    providerAccountId: str
    provider: str


def get_user_by_account(_request: HttpRequest, path_params: PathParams) -> Response:
    """
    get user by account
    (http://localhost:8000/auth/5038bdc3-1d93-470c-a3bf-f57e8558762d)
    """

    try:
        resp = supabase.table("accounts").select("users (*)").match({'provider': path_params['provider'],
                                                                     'providerAccountId': path_params['providerAccountId']}).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def link_account(request: HttpRequest, _path_params: PathParams) -> Response:
    """link account to user"""

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
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        resp = supabase.table("accounts").insert(body['account']).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data, status.HTTP_200_OK)
    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def unlink_account(request: HttpRequest, _path_params: PathParams) -> Response:
    """unlink account from user"""

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        resp = supabase.table("accounts").delete().match({'provider': body['provider'],
                                                          'providerAccountId': body['providerAccountId']}).execute()

        return standard_resp(resp.data, status.HTTP_200_OK)
    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
