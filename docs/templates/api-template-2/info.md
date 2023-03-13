# How to make a new API:

server/[new_name]/methods/file1.py
server/[new_name]/methods/file2.py
server/[new_name]/methods/file3.py

server/[new_name]/**init**.py: empty file

server/[new_name]/views.py:

```
print("hello")
```

server/[new_name]/urls.py:

```
from django.urls import path
from . import views

urlpatterns = [
    path('', views.file1),
    path('<str:identifier>', views.file2),
]
```
