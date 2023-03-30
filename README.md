# Flexer

[untitled company name]

### Run the app locally:

```
Create venv:
python -m venv venv
venv\Scripts\activate

Run venv:
activate venv (ubuntu)
source venv/bin/activate (windows)

Database:
python manage.py makemigrations
python manage.py migrate

Run the app (back-end server):
cd server
pip install -r requirements.txt
python manage.py runserver
==> http://127.0.0.1:8000/

Run the app (front-end client):
cd client
npm install
npm run dev
==> http://localhost:3000/

Unit tests:
python manage.py test

Pylint checks:
pylint ./server (root directory)
```

### API Endpoints:

Conventions:

- https://restfulapi.net/resource-naming/.
- https://medium.com/@nadinCodeHat/rest-api-naming-conventions-and-best-practices-1c4e781eb6a5.
- Supabase returns a max of 1000 records -> requires pagination if more than 1000 records.
- Notes and companies may be added specifically for users themselves, while problems cannot be created (pulled from LeetCode API).

GET:

- Only used for read operations (no database modification allowed).
- Pass data to server using exclusively query parameters.
- Should be easy for a user to type in the URL to get this data returned.

DELETE, POST, PATCH:

- These operations will modify the database.
- Pass data to the server using request body.

For the username/... routes:

- Must check authenticated status of user.
- Must check if the user specified in URL matches the user making the request.
- If the URL user != request user ==> only return data if the resource is marked as public.

Users:

- GET http://127.0.0.1:8000/users: get all users (an admin route only ==> not public). ✓
- GET http://127.0.0.1:8000/username: get a user profile by username. ✓
- DELETE http://127.0.0.1:8000/username: delete a user by their username (test) \*
- POST http://127.0.0.1:8000/users: create a new user (provide user info in request body) (test) \*
- PATCH http://127.0.0.1:8000/username: update an existing user profile by their username (test) \*

Notes:

-- Currently Unused --
- GET http://127.0.0.1:8000/username/notes: get all the notes for a user (filtering by type can be done on the front end)
- GET http://127.0.0.1:8000/username/notes/note_title: get note by note title
- GET http://127.0.0.1:8000/username/notes[?type=___&favorite]: filter returned notes by their type or favorite status
- GET http://127.0.0.1:8000/username/notes/note_title[?type=___&favorite]: ???
- GET http://127.0.0.1:8000/username/notes/company/company_name/: get notes associated with specific company
- GET http://127.0.0.1:8000/username/notes/problem/problem_name/: get notes associated with specific problem
-- Currently Unused --


- GET http://127.0.0.1:8000/companies/company_name/notes: get all public notes associcated with a company
- GET http://127.0.0.1:8000/problems/problem_slug/notes: get all public notes associcated with a problem

- GET http://127.0.0.1:8000/username/companies/company_name/notes: get all notes associated with a company for a specific user
- GET http://127.0.0.1:8000/username/problems/problem_slug/notes: get all notes associated with a company for a specific user

- GET http://127.0.0.1:8000/problems/problem_slug/notes: get notes associated with specific problem

- GET http://127.0.0.1:8000/users/username/notes: get all notes for a user ✓
- GET http://127.0.0.1:8000/users/username/notes/note_id: get a single note ✓

(There is not GET associated with /notes/)
- DELETE http://127.0.0.1:8000/notes/: delete an existing note ✓
- POST http://127.0.0.1:8000/notes/: create a new note ✓
- PATCH http://127.0.0.1:8000/notes/: update an existing note ✓

Companies:

- GET http://127.0.0.1:8000/companies: list all companies (returns a subset of company table fields)
- GET http://127.0.0.1:8000/companies/company_name: get company by company name (detailed info about a company -> returns all fields)
- GET http://127.0.0.1:8000/companies/company_name/problems: get problems associated with a company
- GET http://127.0.0.1:8000/companies/company_name/notes: get all public notes associated with a company

Problems:

- GET http://127.0.0.1:8000/problems: get all problems
- GET http://127.0.0.1:8000/problems/problem_name: get problem by name
- GET http://127.0.0.1:8000/problems/problem_name/companies: get all companies associated with a problem
- GET http://127.0.0.1:8000/problems/problem_name/notes: get all public notes associated with a problem

Favorite Notes:

- GET http://127.0.0.1:8000/user_id/notes/favorites[?type=notes&favorite]: get favorite notes for specific types
- GET http://127.0.0.1:8000/user_id/notes/favorites[?note_id=id]: specific favorite note
- GET http://127.0.0.1:8000/user_id/notes/favorites[?type=notes&note_id=id]: type of note + specific favorite note
- DELETE http://127.0.0.1:8000/user_id/notes/note_id/favorite: remove note as favorite
- POST http://127.0.0.1:8000/user_id/notes/note_id/favorite: set note as favorite

Favorite Problems:

- GET http://127.0.0.1:8000/users/username/favorites/problems: get favorite problems for a user

Favorite Companies:

- GET http://127.0.0.1:8000/users/user_id/favorites/companies: get favorite companies for a user

Leetcode API:

- GET leetcode.something/completed_problems: get solved problems
- GET leetcode.something/user_data: get LeetCode data for a user with a LeetCode account (signed in)

### Project Structure:
