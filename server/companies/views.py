from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view
import asyncio
from flexer import supabase

# /companies
@api_view(['GET'])
def get_all_companies(request: HttpRequest) -> Response:
    """get overview data for all companies"""

    # TODO: make this join better:
    data = supabase.table("get_companies").select("*").execute()
    assert len(data.data) > 0
    return Response(data)

# /companies/company_name
@api_view(['GET'])
def get_company(request, company_name):
    """get detailed info of a single company"""

    data = supabase.table("get_companies").select("*").limit(1).eq("name", company_name).execute()
    assert len(data.data) > 0
    return Response(data)

# # /companies/company_name/notes
# @api_view(['GET'])
# def get_company_notes(request, company_name):
#     """get all notes for a single company"""

#     data = supabase.table("get_company_notes").select("*").eq("name", company_name).execute()
#     assert len(data.data) > 0
#     return Response(data)
