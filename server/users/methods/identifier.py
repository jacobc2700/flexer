''' This module handles the implementation for the methods for the /users/[identifier] endpoint. '''
from typing import TypedDict
from json import JSONDecodeError
import json
from django.http import HttpRequest
from rest_framework import status
from rest_framework.response import Response
from postgrest import APIError

from utils import is_email_valid, is_link_valid, is_pass_valid, is_name_valid, standard_resp
from flexer import supabase, logger


class PathParams(TypedDict):
    """
    GET -> identifer = username,
    PATCH & DELETE -> identifer = id
    """
    identifier: str

# http://127.0.0.1:8000/users/username/


def get(_request: HttpRequest, path_params: PathParams) -> Response:
    """ Get a user by username. """

    username = None if "identifier" not in path_params else path_params["identifier"]

    if not username:
        return standard_resp({}, status.HTTP_400_BAD_REQUEST, "Missing username.")

    try:
        resp = supabase.table("users").select(
            "*").limit(1).match({'username': path_params["identifier"]}).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)
        return standard_resp(data=resp.data, status_code=status.HTTP_200_OK)
    except APIError as err:
        msg = f"{err.code} - {err.message}"
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, msg)
    except Exception as ex:  # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)

# http://127.0.0.1:8000/users/id/ with [request body]


def patch(request: HttpRequest, path_params: PathParams) -> Response:
    """ Update a user by ID (specifying any number of parameters to update in the body). """

    # User fields that are allowed to be updated by the client.
    keys = {'email', 'password', 'username', 'first_name', 'last_name',
            'visibility', 'image', 'twitter', 'github', 
            'website', 'linkedin', 'facebook', 'youtube'}

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        # filter out any keys that aren't in the keys set
        changes = {k: body[k] for k in body.keys() if k in keys}

        # Do any input validation here (TODO: image validation)
        if 'password' in changes:
            assert is_pass_valid(
                changes['password']), 'Password must be at least 6 characters.'
        if 'username' in changes:
            assert is_name_valid(changes['username']), 'Invalid username.'
        if 'first_name' in changes:
            assert is_name_valid(
                changes['first_name'], True), 'Invalid first name.'
        if 'last_name' in changes:
            assert is_name_valid(
                changes['last_name'], True), 'Invalid last name.'
        if 'email' in changes:
            assert is_email_valid(changes['email']), 'Invalid email.'
        if 'twitter' in changes:
            assert is_link_valid(changes['twitter'], 'twitter.com'), 'Invalid twitter link.'
        if 'github' in changes:
            assert is_link_valid(changes['github'], 'github.com'), 'Invalid github link.'
        if 'website' in changes:
            assert is_link_valid(changes['website']), 'Invalid website link.'
        if 'linkedin' in changes:
            assert is_link_valid(changes['linkedin'], 'linkedin.com'), 'Invalid linkedin link.'
        if 'facebook' in changes:
            assert is_link_valid(changes['facebook'], 'facebook.com'), 'Invalid facebook link.'
        if 'youtube' in changes:
            assert is_link_valid(changes['youtube'], 'youtube.com'), 'Invalid youtube link.'

        resp = supabase.table("users").update(
            changes).eq("id", path_params["identifier"]).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)
        return standard_resp(data=resp.data[0], status_code=status.HTTP_200_OK)

    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except AssertionError as err:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, str(err))
    except APIError as err:
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:  # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR)


def delete(_request: HttpRequest, path_params: PathParams) -> Response:
    """delete user by user id"""

    try:
        resp = supabase.table("users").delete().eq(
            "id", path_params["identifier"]).execute()

        if len(resp.data) == 0:  # intentially didn't use != -1
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_200_OK)
    except APIError as err:
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:  # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR)
