# Flexer

[untitled company name]

# Install Django and Django REST framework into the virtual environment

```
virtual environment
pip install psycopg2-binary
pip install django
pip install djangorestframework
pip install supabase
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
http://127.0.0.1:8000/
```

### Endpoints:

Users:

- GET http://127.0.0.1:8000/users/: get all users.
- GET http://127.0.0.1:8000/users/user_id/: get a user by their ID.
- DELETE http://127.0.0.1:8000/users/user_id/: delete a user by their ID.
- POST http://127.0.0.1:8000/users/user_id/: update a user by their ID.

Notes:

- GET http://127.0.0.1:8000/users/user_id/notes/: get all the notes for a user.
- GET http://127.0.0.1:8000/users/user_id/notes/note_id/: get a specific note for a specific user.
- DELETE http://127.0.0.1:8000/users/user_id/notes/note_id/: delete a specific note for a specific user.
- POST http://127.0.0.1:8000/users/user_id/notes/note_id/: update a specific note for a specific user.

Favorite Notes:

- GET http://127.0.0.1:8000/users/user_id/favorites?type=notes

Favorite Problems:

- http://127.0.0.1:8000/users/id/favorites/problems/: get a user

Companies:

- http://127.0.0.1:8000/companies/: get all companies.
- http://127.0.0.1:8000/problems/: get a company by its ID.

Problems:

- http://127.0.0.1:8000/problems/: get all problems.
- http://127.0.0.1:8000/problems/id/: get a problem by its ID.

users can save problems, which can be marked as [solved, favorited].
users can save companies, which can be marked as [applied, favorited].
users can save notes, which can be marked as [favorited] and associated with [type (problem, company, other)].

notes and companies may be added specifically for users themselves, while problems cannot be created.
