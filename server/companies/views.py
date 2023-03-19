from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view

from flexer import supabase

# /companies
@api_view(['GET'])
def get_all_companies(request: HttpRequest) -> Response:
    """get overview data for all companies"""

    # TODO: fix
    data = supabase.table("levels").select("*").limit(5).execute()
    data = supabase.table("levels").select('company_id, *, companies (id)').limit(5).execute()
    data = supabase.table("joined_tables").select("*").execute()
    assert len(data.data) > 0
    return Response(data)
    # raise NotImplementedError

# /companies/company_name
@api_view(['GET'])
def get_company(request, company_name):
    """get detailed info of a single company"""

    # data = supabase.table("levels").select("*").limit(5).match({'company': company_name}).execute()

    # assert len(data.data) > 0
    # return Response(data)
    raise NotImplementedError
