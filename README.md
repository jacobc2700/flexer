# Flexer

[untitled company name]

### Commands:

```
Active virtual environment:
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

Database:
python manage.py makemigrations
python manage.py migrate

Run the app:
python manage.py runserver
http://127.0.0.1:8000/

Unit tests:
python manage.py test
```

### Endpoints:

https://restfulapi.net/resource-naming/
https://medium.com/@nadinCodeHat/rest-api-naming-conventions-and-best-practices-1c4e781eb6a5

Note: supabase returns a max of 1000 records -> requires pagination if more than 1000 records.

GET routes: 
- only used for read operations (no db modification allowed)
- pass data to server using query params
- should be easy for a user to type in the URL

DELETE/POST/PATCH routes: 
- these operations will modify the db
- pass data to server using request body

username/.. routes:
- must check auth status of user
- must check if user specified in URL matches the user making the request
- if url user != request user -> only return data if the resource is marked as public.

Users:

- GET http://127.0.0.1:8000/users: get all users. (an admin route only?)

- GET http://127.0.0.1:8000/username: get a user profile by username.

- DELETE http://127.0.0.1:8000/username: delete a user by their ID.
- POST http://127.0.0.1:8000/username: create a user.
- PATCH http://127.0.0.1:8000/username: update a user profile.

Notes:

- GET http://127.0.0.1:8000/username/notes: get all the notes for a user (filtering by type can be done on the front end).
- GET http://127.0.0.1:8000/username/notes/note_title: get note by title

- GET http://127.0.0.1:8000/username/notes[?type=___&favorite]
- GET http://127.0.0.1:8000/username/notes/note_title[?type=___&favorite]

- GET http://127.0.0.1:8000/username/notes/company/company_name/: get notes associated with specific company
- GET http://127.0.0.1:8000/username/notes/problem/problem_name/: get notes associated with specific problem

- DELETE http://127.0.0.1:8000/username/notes: delete a note
- POST http://127.0.0.1:8000/username/notes: create a note
- PATCH http://127.0.0.1:8000/username/notes: update a note

Companies:

- GET http://127.0.0.1:8000/companies: list all companies (returns a subset of company table fields)
- GET http://127.0.0.1:8000/companies/company_name: get company by company name (detailed info about a company -> returns all fields)
- GET http://127.0.0.1:8000/companies/company_name/problems: get problems associated with a company
- GET http://127.0.0.1:8000/companies/company_name/notes: get all public notes associated with a company

Problems:

- http://127.0.0.1:8000/problems: get all problems.
- http://127.0.0.1:8000/problems/problem_name: get problem by name.
- http://127.0.0.1:8000/problems/problem_name/companies: get all companies associated with a problem
- http://127.0.0.1:8000/problems/problem_name/notes: get all public notes associated with a problem

Favorite Notes:
- GET http://127.0.0.1:8000/user_id/notes/favorites[?type=notes&favorite]
- GET http://127.0.0.1:8000/user_id/notes/favorites[?note_id=id]
- GET http://127.0.0.1:8000/user_id/notes/favorites[?type=notes&note_id=id]

- DELETE http://127.0.0.1:8000/user_id/notes/note_id/favorite: remove note as favorite
- POST http://127.0.0.1:8000/user_id/notes/note_id/favorite: set note as favorite

Favorite Problems:

- GET http://127.0.0.1:8000/users/username/favorites/problems: get all user's fav problems

Favorite Companies:

- GET http://127.0.0.1:8000/users/user_id/favorites/companies: get all user's fav companies

Leetcode API:
- leetcode.something/completed_problems
- leetcode.something/user_data

users can save problems, which can be marked as [solved, favorited].
users can save companies, which can be marked as [applied, favorited].
users can save notes, which can be marked as [favorited] and associated with [type (problem, company, other)].

notes and companies may be added specifically for users themselves, while problems cannot be created.
