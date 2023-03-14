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
    """
    GET -> identifer = username,
    PATCH & DELETE -> identifer = id
    """
    identifier: str


def create_token(request: HttpRequest, _path_params: PathParams) -> Response:
    """create a token for a user"""

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
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        resp = supabase.table("verification_tokens").insert(
            body['token']).execute()

        return standard_resp(resp.data, status.HTTP_200_OK)
    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def delete_token(request: HttpRequest, _path_params: PathParams) -> Response:
    """delete token associated with user id"""

    # print(path_params)

    # account = {
    #     id?: string
    #     type?: string | null
    #     provider?: string | null
    #      id: number
    #           identifier: string | null
    #           token: string | null
    #           expires: string | null
    # }

    # TODO: must validate all the fields are present within account object.

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        identifier = body['identifier']
        token = body['token']

        resp = supabase.table("verification_tokens").delete().match(
            {"identifier": identifier, "token": token}).execute()

        return standard_resp(resp.data, status.HTTP_200_OK)
    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
