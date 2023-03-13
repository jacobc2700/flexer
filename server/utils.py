from typing import Callable, Optional
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from flexer import logger

# Custom error means the method is not allowed
class MethodNotAllowedError(TypeError):
    pass

# Universal response object for HTTP methods
def standard_resp(data, statusCode: int, message: 'Optional[str]' = ""):
    ok: bool = (status.is_informational(statusCode) or status.is_success(statusCode) or status.is_redirect(
        statusCode)) and not (status.is_client_error(statusCode) or status.is_server_error(statusCode))

    return Response({
        "ok": ok,
        "status": statusCode,
        "message": message,
        "data": data,
    }, status=statusCode)

# Helper to run HTTP methods on some URL
def exec_method(
        request: HttpRequest,
        path_params: 'Optional[dict]' = None,
        GET: 'Optional[Callable]' = None,
        POST: 'Optional[Callable]' = None,
        PATCH: 'Optional[Callable]' = None,
        DELETE: 'Optional[Callable]' = None,
        PUT: 'Optional[Callable]' = None) -> Response:
    try:
        if request.method == 'GET':
            if GET is None:
                raise MethodNotAllowedError()
            return GET(request, path_params)
        elif request.method == 'POST':
            if POST is None:
                raise MethodNotAllowedError()
            return POST(request, path_params)
        elif request.method == 'PATCH':
            if PATCH is None:
                raise MethodNotAllowedError()
            return PATCH(request, path_params)
        elif request.method == 'DELETE':
            if DELETE is None:
                raise MethodNotAllowedError()
            return DELETE(request, path_params)
        elif request.method == 'PUT':
            if PUT is None:
                raise MethodNotAllowedError()
            return
    except MethodNotAllowedError:
        return standard_resp({}, status.HTTP_405_METHOD_NOT_ALLOWED)
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)

# Password requirements
# TODO: add more
def is_pass_valid(password: str):
    return len(password) >= 6