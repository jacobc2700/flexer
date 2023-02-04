from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getData(request):
    person = {'name': 'Bob', 'age': 28}
    # dict is auto returned as JSON.
    return Response(person)