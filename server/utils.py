''' This file contains utility functions that are used in multiple places. '''
import re
from typing import Callable, Optional, TypedDict, Union
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest

from flexer import logger

class Methods(TypedDict, total=False):
    '''A dictionary of allowed HTTP methods (key=string, value=function).'''
    get: Callable
    post: Callable
    patch: Callable
    delete: Callable
    put: Callable

class MethodNotAllowedError(TypeError):
    """Used when 405 (method not allowed) error occurs."""

def standard_resp(data, status_code: int, message: 'Optional[str]' = ""):
    """
    Standardize the API's response object for all endpoints.
    Response = {
        ok: bool,
        status: int,
        message: str,
        data: any,
    }
    (All data must be JSON serializable).
    """

    is_informational = status.is_informational(status_code)
    is_success = status.is_success(status_code)
    is_redirect = status.is_redirect(status_code)
    is_client_error = status.is_client_error(status_code)
    is_server_error = status.is_server_error(status_code)
    is_ok = is_informational or is_success or is_redirect
    is_error = is_client_error or is_server_error
    success: bool = is_ok and not is_error

    return Response({
        "ok": success,
        "status": status_code,
        "message": message,
        "data": data,
    }, status=status_code)

# Standardized helper function to run HTTP methods on some URL.
def exec_method( # pylint: disable=too-many-return-statements disable=inconsistent-return-statements
    request: HttpRequest,
    path_params: 'Optional[dict]' = None,
    methods: 'Optional[Methods]' = None
    ) -> Response:
    """
    Executes the correct HTTP request method depending on the request.method property.
    Accepted methods: GET, POST, PATCH, DELETE, PUT.
    path_params: a dictionary with additional data that isn't in the request argument.
    """

    try:
        if request.method == 'GET':
            if 'get' not in methods:
                raise MethodNotAllowedError()
            return methods['get'](request, path_params)
        if request.method == 'POST':
            if 'post' not in methods:
                raise MethodNotAllowedError()
            return methods['post'](request, path_params)
        if request.method == 'PATCH':
            if 'patch' not in methods:
                raise MethodNotAllowedError()
            return methods['patch'](request, path_params)
        if request.method == 'DELETE':
            if 'delete' not in methods:
                raise MethodNotAllowedError()
            return methods['delete'](request, path_params)
        if request.method == 'PUT':
            if 'put' not in methods:
                raise MethodNotAllowedError()
            return methods['put'](request, path_params)
    except MethodNotAllowedError:
        return standard_resp({}, status.HTTP_405_METHOD_NOT_ALLOWED)
    except Exception as ex: # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)

# Password requirements:
# 1. At least 9 characters long.
# 2. At least 1 lowercase letter.
# 3. At least 1 uppercase letter.
# 4. At least 1 number.
def is_pass_valid(password: str):
    """Make sure that the password is strong enough."""

    if len(password) < 9:
        return False
    if not re.search("[a-z]", password):
        return False
    if not re.search("[A-Z]", password):
        return False
    if not re.search("[0-9]", password):
        return False

    return True

def is_email_valid(email: str):
    """Make sure that the email is valid."""
    if not re.search(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email):
        return False

    return True

def is_name_valid(username: str, allow_spaces: bool = False):
    """Make sure that the username/fname/lname is valid."""
    if allow_spaces:
        if not re.search(r"^[a-zA-Z0-9_.- ]+$", username):
            return False
    else:
        if not re.search(r"^[a-zA-Z0-9_.-]+$", username):
            return False

    return True

def is_link_valid(link: str, domain: Union[str, None]):
    """Make sure that the link is valid."""
    if domain:
        # allows for http://, https://, and www. before the domain name.
        if not re.search(rf"^(?:http://|https://)?(?:www.)?{domain}", link):
            return False
    else:
        if not re.search(r"^(?:http://|https://)", link):
            return False

    return True