from typing import Callable, Union, Optional
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest


class MethodNotAllowedError(TypeError):
    pass


def standard_resp(data, statusCode: int, message: 'Optional[str]' = ""):
    ok: bool = (status.is_informational(statusCode) or status.is_success(statusCode) or status.is_redirect(
        statusCode)) and not (status.is_client_error(statusCode) or status.is_server_error(statusCode))

    return Response({
        "ok": ok,
        "status": statusCode,
        "message": message,
        "data": data,
    }, status=statusCode)


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
            if GET == None:
                raise MethodNotAllowedError()
            return GET(request)
        elif request.method == 'POST':
            if POST == None:
                raise MethodNotAllowedError()
            return POST(request)
        elif request.method == 'PATCH':
            if PATCH == None:
                raise MethodNotAllowedError()
            return PATCH(request)
        elif request.method == 'DELETE':
            if DELETE == None:
                raise MethodNotAllowedError()
            return DELETE(request)
        elif request.method == 'PUT':
            if PUT == None:
                raise MethodNotAllowedError()
            return
    except MethodNotAllowedError:
        return standard_resp({}, status.HTTP_405_METHOD_NOT_ALLOWED)
    except:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
