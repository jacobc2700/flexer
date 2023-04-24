''' This module handles the implementation for the methods for the /users/ endpoint. '''
import json
from json import JSONDecodeError
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from postgrest import APIError

from utils import is_pass_valid, standard_resp
from flexer import supabase, logger

# http://127.0.0.1:8000/users/
def get(_request: HttpRequest, _path_params = None) -> Response:
    """ Get all users in the same table. """

    try:
        resp = supabase.table("users").select("*").execute()
        return standard_resp(resp.data, status.HTTP_200_OK)
    except APIError as err:
        error_message = f"{err.code} - {err.message}"
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, error_message)
    except Exception as ex: # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)

# http://127.0.0.1:8000/users/ with [request body]
def post(request: HttpRequest, _path_params = None) -> Response:
    """ Create a single new user (if body is valid). """
    # username, email ==> needs to be unique.
    # is_pass_valid(password) ==> needs to be true.
    # [first_name, last_name, email, password, username] ==> needs to be in body.

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    print("creating a new user")

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        users = supabase.table("users")

        if not is_pass_valid(body['password']):
            raise ValueError('Password does not conform to requirements.')

        is_email = 'email' in body and len(body['email'].strip().replace(" ", "_")) > 0
        is_username = 'username' in body and len(body['username'].strip().replace(" ", "_")) > 0
        is_first_name = 'first_name' in body and len(body['first_name'].strip().replace(" ", "_")) > 0
        is_last_name = 'last_name' in body and len(body['last_name'].strip().replace(" ", "_")) > 0
        is_password = 'password' in body and len(body['password'].strip().replace(" ", "_")) > 0
        valid_fields = is_email and is_username and is_first_name and is_last_name and is_password

        if not valid_fields:
            raise ValueError('Missing required fields.')

        same_username = users.select("*").match({'username': body['username']}).execute()

        if len(same_username.data) != 0:
            raise ValueError('Username already exists.')

        same_email = users.select("*").match({'email': body['email']}).execute()

        if len(same_email.data) != 0:
            raise ValueError('Email already exists.')

        new_user_object = {
            'email': body['email'],
            'password': body['password'],
            'username': body['username'],
            'first_name': body['first_name'],
            'last_name': body['last_name']
        }

        resp = users.insert(new_user_object).execute()

        if len(resp.data) != 1:
            return standard_resp(data=None, status_code=status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_201_CREATED)
    except JSONDecodeError:
        print("JSON Decode Error")
        msg = "Invalid request body."
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, msg)
    except ValueError as err:
        msg = str(err)
        print(msg)
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, msg)
    except APIError as err:
        msg = f"{err.code} - {err.message}"
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR, msg)
    except Exception as ex: # pylint: disable=broad-except
        logger.exception(ex)
        return standard_resp(None, status.HTTP_500_INTERNAL_SERVER_ERROR)
