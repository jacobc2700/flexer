from rest_framework.response import Response
from rest_framework.decorators import api_view
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

# /companies
@api_view(['GET'])
def get_all_companies(request):
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    # data = supabase.table("levels").select("*").limit(5).execute()
    # data = supabase.table("levels").select('company_id, *, companies (id)').limit(5).execute()
    data = supabase.table("joined_tables").select("*").execute()
    # assert len(data.data) > 0
    return Response(data)

# /companies/company_name
@api_view(['GET'])
def get_company(request, company_name):
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")

    supabase: Client = create_client(url, key)
    data = supabase.table("levels").select("*").limit(5).match({'company': company_name}).execute()

    assert len(data.data) > 0
    return Response(data)