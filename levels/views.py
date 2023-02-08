from rest_framework.response import Response
from rest_framework.decorators import api_view
from supabase import create_client, Client

# get all
@api_view(['GET'])
def getData(request):
    # person = {'name': 'Bob', 'age': 28}
    url = ""
    key = ""
    supabase: Client = create_client(url, key)
    data = supabase.table("levels").select("*").limit(5).execute()

    random_email: str = "asdasdasdasd@supamail.com"
    random_password: str = "asdasdasdasd"
    user = supabase.auth.sign_up({'email': random_email, 'password': random_password, 'more': 'moreee', 'email_confirm': False})
    print(user)

    assert len(data.data) > 0
    return Response(data)

@api_view(['GET'])
def getSpecific(request, company_name):
    # print(name)
    person = {'name': 'Bob', 'age': 28}
    url=""
    key = ""

    supabase: Client = create_client(url, key)
    data = supabase.table("levels").select("*").limit(5).match({'company': company_name}).execute()

    assert len(data.data) > 0
    return Response(data)