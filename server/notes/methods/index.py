import datetime
import json
from json import JSONDecodeError
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from postgrest import APIError

from utils import standard_resp
from flexer import supabase, logger


def get(request: HttpRequest, _path_params=None) -> Response:
    """get all notes associated with a user"""

    #
    # TEMP: should be moved to /users/notes later
    # /notes?user_id=
    #

    try:
        user_id = request.query_params.get('user_id')

        if user_id is None:
            raise ValueError('user_id is required')

        resp = supabase.table("notes").select(
            "*").match({'user_id': user_id}).execute()
        return standard_resp(resp.data, status.HTTP_200_OK)
    except ValueError as err:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, str(err))
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def post(request: HttpRequest, _path_params=None) -> Response:
    """
    Creates a new note
    /notes, body: {"user_id":, "title":, "description":, "body":, "type":}
    """

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if body.get('user_id') is None:
            raise ValueError('user_id is required')

        note_type = body.get('type')

        if note_type not in ["COMPANY", "PROBLEM", "UNSPECIFIED"]:
            note_type = "UNSPECIFIED"

        new_note_dict = {
            "user_id": body['user_id'],
            "title": body.get('title', ""),
            "description": body.get('description', ""),
            "body": body.get('body', ""),
            "type": note_type
        }

        resp = supabase.table("notes").insert(new_note_dict).execute()

        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_201_CREATED)

    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except ValueError as err:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, str(err))
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def patch(request: HttpRequest, _path_params=None) -> Response:
    """
    update a note
    /notes, body: {"user_id":, "title":, "description":, "body":, "type":, "visibility":}
    (json ex: {"user_id":"", "note_id": "", "title":"", "":"", "visibility": ""})
    """

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if body.get('user_id') is None:
            raise ValueError('user_id is required')
        if body.get('note_id') is None:
            raise ValueError('note_id is required')

        note_type = body.get('type')
        visibility = body.get('visibility')

        if note_type not in ["COMPANY", "PROBLEM", "UNSPECIFIED"]:
            note_type = "UNSPECIFIED"
        if visibility not in ["PRIVATE", "PUBLIC"]:
            visibility = "PRIVATE"

        new_note_dict = {
            "title": body.get('title', ""),
            "description": body.get('description', ""),
            "body": body.get('body', ""),
            "type": note_type,
            "visibility": visibility,
            "updated_at": datetime.datetime.now().isoformat()
        }

        resp = supabase.table("notes").update(new_note_dict).match(
            {"user_id": body['user_id'], "id": body['note_id']}).execute()
        
        if len(resp.data) != 1:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_200_OK)
    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except ValueError as err:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, str(err))
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def delete(request: HttpRequest, _path_params=None) -> Response:
    """
    delete a note
    /notes, body: {"user_id":, "note_id":}
    """

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if body.get('user_id') is None:
            raise ValueError('user_id is required')
        if body.get('note_id') is None:
            raise ValueError('note_id is required')

        resp = supabase.table("notes").delete().match(
            {'id': body['note_id'], 'user_id': body['user_id']}).execute()
        
        if len(resp.data) == 0:
            return standard_resp(None, status.HTTP_200_OK)

        return standard_resp(resp.data[0], status.HTTP_200_OK)
    except JSONDecodeError:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, "Invalid request body")
    except ValueError as err:
        return standard_resp(None, status.HTTP_400_BAD_REQUEST, str(err))
    except APIError as err:
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR, f"{err.code} - {err.message}")
    except Exception as ex:
        logger.exception(ex)
        return standard_resp({}, status.HTTP_500_INTERNAL_SERVER_ERROR)
