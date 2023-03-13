from rest_framework.response import Response
from rest_framework.decorators import api_view
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv('.env.local')

# /base
@api_view(['GET'])
def function_name(request):
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    data = supabase.table("table_name").select("*").limit(5).execute()
    assert len(data.data) > 0
    return Response(data)