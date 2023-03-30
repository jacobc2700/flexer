''' This module contains the URL endpoints for companies. '''
from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view
from flexer import supabase
from utils import exec_method

from .methods import companies as companies_methods
from .methods import identifier as identifier_methods
from .methods import notes as notes_methods

@api_view(['GET'])
def companies(request: HttpRequest) -> Response:
    """
    /companies
    GET: view all companies.

    http://127.0.0.1:8000/companies/ (GET)
    """

    methods = {
        'get': companies_methods.get
    }

    return exec_method(request=request, path_params=None, methods=methods)

@api_view(['GET'])
def identifier(request: HttpRequest, id: str) -> Response:
    """
    /companies/company_name
    GET: gets data back about a single company by company name.

    http://127.0.0.1:8000/companies/company_name/ (GET)
    """

    path_params = {
        "identifier": id
    }

    methods = {
        'get': identifier_methods.get
    }

    return exec_method(request=request, path_params=path_params, methods=methods)

@api_view(['GET'])
def company_notes(request: HttpRequest, company_name: str) -> Response:
    """
    /companies/company_name/notes
    GET: gets notes about a single company by company name.
    """
    
    path_params = {
        "company_name": company_name
    }

    methods = {
        'get': notes_methods.get_notes
    }

    return exec_method(request=request, path_params=path_params, methods=methods)