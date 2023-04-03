''' This module contains the URL endpoints for users. '''
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpRequest
from utils import exec_method

# from .methods import users as users_methods
# from .methods import identifier as identifier_methods
# from .methods import note as note_methods
# from .methods import note_id as note_id_methods
from .methods import problems as problems_methods
from .methods import identifier as identifier_methods
from .methods import companies as companies_methods
from .methods import notes as notes_methods

@api_view(['GET'])
def problems(request: HttpRequest) -> Response:
    """
    /problems/
    GET: get all the problems.
    http://127.0.0.1:8000/problems/ (GET)
    """

    methods = {
        'get': problems_methods.problems
    }

    return exec_method(request=request, path_params=None, methods=methods)

@api_view(['GET'])
def identifier(request: HttpRequest, id: str):  # pylint: disable=redefined-builtin disable=invalid-name
    """
    /problems/question-title-slug/
    GET: get a problem by its LeetCode question slug.

    http://127.0.0.1:8000/problems/ (GET)
    """

    path_params = {
        "identifier": id
    }

    methods = {
        'get': identifier_methods.get,
    }

    return exec_method(request=request, path_params=path_params, methods=methods)


@api_view(['GET'])
def companies_for_problem(request: HttpRequest, id: str):  # pylint: disable=redefined-builtin disable=invalid-name
    """
    /problems/question-title-slug/notes/
    GET: get the notes for a specific problem.

    http://127.0.0.1:8000/problems/ (GET)
    """

    path_params = {
        "identifier": id
    }

    methods = {
        'get': companies_methods.get_companies_for_problem,
    }

    return exec_method(request=request, path_params=path_params, methods=methods)

@api_view(['GET'])
def notes_for_problem(request: HttpRequest, id: str):  # pylint: disable=redefined-builtin disable=invalid-name
    """
    /problems/question-title-slug/notes/
    GET: get the notes for a specific problem.

    http://127.0.0.1:8000/problems/ (GET)
    """

    path_params = {
        "identifier": id
    }

    methods = {
        'get': notes_methods.get_notes_for_problem,
    }

    return exec_method(request=request, path_params=path_params, methods=methods)