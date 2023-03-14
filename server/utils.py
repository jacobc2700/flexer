from typing import Callable, Optional
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from flexer import logger


class MethodNotAllowedError(TypeError):
    """Used when 405 (method not allowed) error occurs"""


def standard_resp(data, status_code: int, message: 'Optional[str]' = ""):
    """
    Standardize the API's response object
    Response{
        ok: bool,
        status: int,
        message: str,
        data: any,
    }
    (all data must be JSON serializable)
    """
    success: bool = (status.is_informational(status_code) or status.is_success(status_code) or status.is_redirect(
        status_code)) and not (status.is_client_error(status_code) or status.is_server_error(status_code))

    return Response({
        "ok": success,
        "status": status_code,
        "message": message,
        "data": data,
    }, status=status_code)

# Helper to run HTTP methods on some URL


def exec_method(
        request: HttpRequest,
        path_params: 'Optional[dict]' = None,
        get: 'Optional[Callable]' = None,
        post: 'Optional[Callable]' = None,
        patch: 'Optional[Callable]' = None,
        delete: 'Optional[Callable]' = None,
        put: 'Optional[Callable]' = None) -> Response:
    """
    Executes the correct http request method depending on the request.method property
    Accepted methods: GET, POST, PATCH, DELETE, PUT
    path_params: a dictionary with additional data that isn't in the request arg.
    """

    try:
        if request.method == 'GET':
            if get is None:
                raise MethodNotAllowedError()
            return get(request, path_params)
        if request.method == 'POST':
            if post is None:
                raise MethodNotAllowedError()
            return post(request, path_params)
        if request.method == 'PATCH':
            if patch is None:
                raise MethodNotAllowedError()
            return patch(request, path_params)
        if request.method == 'DELETE':
            if delete is None:
                raise MethodNotAllowedError()
            return delete(request, path_params)
        if request.method == 'PUT':
            if put is None:
                raise MethodNotAllowedError()
            return put(request, path_params)
    except MethodNotAllowedError:
        return standard_resp({}, status.HTTP_405_METHOD_NOT_ALLOWED)
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def is_pass_valid(password: str):
    """Make sure that the password is strong enough."""

    # TODO: more complex password validation
    return len(password) >= 6
