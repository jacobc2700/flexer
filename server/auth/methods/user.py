from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
import json
from json import JSONDecodeError
from postgrest import APIError

from flexer import supabase, logger
from utils import is_pass_valid, standard_resp


def GET(request: HttpRequest, post_params = None) -> Response:
    try:
        resp = supabase.table("users").select("*").limit(5).execute()
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        # logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)