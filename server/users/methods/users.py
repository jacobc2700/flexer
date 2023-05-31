''' This module handles the implementation for the methods for the /users/ endpoint. '''
import json
from json import JSONDecodeError
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from postgrest import APIError

from utils import is_email_valid, is_name_valid, is_pass_valid, standard_resp
from flexer import supabase, logger

# http://127.0.0.1:8000/users/


def get(_request: HttpRequest, _path_params=None) -> Response:
    """ Get all users in the same table. """

    try:
        resp = supabase.table("users").select("*").execute()
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        error_message = f"{err.code} - {err.message}"
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, error_message)
    except Exception as ex:  # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)

# http://127.0.0.1:8000/users/ with [request body]


def post(request: HttpRequest, _path_params=None) -> Response:
    """ Create a single new user (if body is valid). """
    # username, email ==> needs to be unique.
    # FUTURE: is_pass_valid(password) ==> needs to be true.
    # [first_name, last_name, email, FUTURE: password, username] ==> needs to be in body.

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        users = supabase.table("users")

        assert 'email' in body and is_email_valid(body['email']), 'Invalid email.'
        assert 'username' in body and is_name_valid(body['username']), 'Invalid username.'
        assert 'first_name' in body and is_name_valid(body['first_name'], True), 'Invalid first name.'
        assert 'last_name' in body and is_name_valid(body['last_name'], True), 'Invalid last name.'

        unique_username = supabase.table("users").select(
            "*").match({'username': body['username']}).execute()
        assert len(unique_username.data) != 0, 'Username already exists.'

        unique_email = supabase.table("users").select(
            "*").match({'email': body['email']}).execute()
        assert len(unique_email.data) != 0, 'Email already exists.'

        new_user_object = {
            'email': body['email'],
            'username': body['username'],
            'first_name': body['first_name'],
            'last_name': body['last_name']
        }

        resp = users.insert(new_user_object).execute()

        if len(resp.data) != 1:
            raise Exception("Failed to create user.")
        
        return standard_resp(resp.data[0], status.HTTP_201_CREATED)
    except JSONDecodeError:
        print("JSON Decode Error")
        msg = "Invalid request body."
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, msg)
    except AssertionError as err:
        msg = str(err)
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, msg)
    except APIError as err:
        msg = f"{err.code} - {err.message}"
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR, msg)
    except Exception as ex:  # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR)
