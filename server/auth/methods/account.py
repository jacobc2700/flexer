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
    provider_account_id: str
    provider: str


VALID_KEYS = {'id', 'type', 'provider', 'providerAccountId', 'refresh_token',
              'access_token', 'expires_at', 'token_type', 'scope', 'id_token', 'session_state', 'oauth_token_secret', 'oauth_token', 'userId'}


def get_user_by_account(_request: HttpRequest, path_params: PathParams) -> Response:
    """
    get user by account
    (http://localhost:8000/auth/5038bdc3-1d93-470c-a3bf-f57e8558762d)
    """

    try:
        resp = supabase.table("accounts").select("users (*)").match({'provider': path_params['provider'],
                                                                     'providerAccountId': path_params['provider_account_id']}).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0]['users'], status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def link_account(request: HttpRequest, _path_params: PathParams) -> Response:
    """link account to user"""

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        # filters out all body params that aren't defined to the valid_keys set.
        account = {key: body[key]
                   for key in VALID_KEYS if body.get(key) != None}

        resp = supabase.table("accounts").insert(account).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_200_OK)
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

        if len(resp.data) == 0: # intentially not using != 1
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_200_OK)
    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
