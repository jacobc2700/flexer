# How to make a new API:

flexer/server/[new_name]
├── methods
│ ├── file21.ext
│ └── file23.ext
├── **init**.py
├── urls.py
└── views.py

views.py:

```
print("hello")
```

urls.py:

```
from django.urls import path
from . import views

urlpatterns = [
    path('', views.users),
    path('<str:identifier>', views.identifier),
]
```
