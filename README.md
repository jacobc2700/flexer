# Flexer

Flexer is a social media website for developers to maintain a career portfolio and connect with other users to increase their chance at landing a software engineering job.

### Features

- Create a personal portfolio consisting of your work experience, social media links, and public notes.
- Connect with other users on the site.
- Browse coding interview problems from LeetCode.
- Browse salaries for companies from Levels.fyi.
- Create public and private notes.
- Maintain a collection of your favorite problems, companies, and notes.
- Sign in with your Google account.

### Run Application Locally

```
Create .env files in client and root with valid secret keys.

Create virtual environment:
python -m venv venv
venv\Scripts\activate

Active virtual environment:
activate venv (for Ubuntu)
source venv/bin/activate (for Windows)

Database migrations:
python manage.py makemigrations
python manage.py migrate

Run the back-end:
cd server
pip install -r requirements.txt
python manage.py runserver
Go to http://127.0.0.1:8000/

Run the front-end:
cd client
npm install
npm run dev
Go to http://localhost:3000/

Run back-end unit tests:
python manage.py test

Pylint style checks:
pylint ./server (root directory)
```

### Sample Endpoints

- http://127.0.0.1:8000/users.
- http://127.0.0.1:8000/username.
- http://127.0.0.1:8000/username/notes.
- http://127.0.0.1:8000/username/notes/note_title.
- http://127.0.0.1:8000/username/notes[?type=___&favorite].
- http://127.0.0.1:8000/companies/company_name/notes.
- http://127.0.0.1:8000/problems/problem_slug/note.
- http://127.0.0.1:8000/username/companies/company_name/notes.
- http://127.0.0.1:8000/username/problems/problem_slug/notes.
- http://127.0.0.1:8000/problems/problem_slug/notes.
- http://127.0.0.1:8000/users/username/notes.
- http://127.0.0.1:8000/users/username/notes/note_id.
- http://127.0.0.1:8000/companies.
- http://127.0.0.1:8000/companies/company_name.
- http://127.0.0.1:8000/companies/company_name/problems.
- http://127.0.0.1:8000/companies/company_name/notes.
- http://127.0.0.1:8000/problems.
- http://127.0.0.1:8000/problems/problem_name.
- http://127.0.0.1:8000/problems/problem_name/companies.
- http://127.0.0.1:8000/problems/problem_name/notes.
- http://127.0.0.1:8000/user_id/notes/favorites[?type=notes&favorite].
- http://127.0.0.1:8000/user_id/notes/favorites[?note_id=id].
- http://127.0.0.1:8000/user_id/notes/favorites[?type=notes&note_id=id].
- http://127.0.0.1:8000/user_id/notes/note_id/favorite.
- http://127.0.0.1:8000/user_id/notes/note_id/favorite.
- http://127.0.0.1:8000/users/username/favorites/problems.
- http://127.0.0.1:8000/users/user_id/favorites/companies.

### Application Structure

- `admin`: various Python scripts for obtaining data on companies, salaries, and problems.
- `client`: user interface built with React, Next.js, and Material UI.
- `docs`: style guide, API templates, archived documents, and SQL queries.
- `server`: endpoints for Django API which interact with SQL database.

### Timeline

The project began as a Django web application generated by django-admin. Using the Django REST Framework and Postman, we created and tested the basic endpoints for performing REST API operations (Create, Read, Patch, Update, Delete). The main endpoint categories are /users, /problems, /companies, and /notes. The endpoints interact with a MySQL database hosted on Supabase. We created ~15-20 SQL tables connected with primary/foreign keys and which are based on an Entity-Relationship Diagram we designed with Draw.io. Since Supabase provides an abstraction over plain SQL queries, we created SQL views and then performed select statements on these views to run more advanced SQL queries for our endpoints. The featured problems come from the LeetCode API, and the company salary data comes from a JSON file owned by Levels.fyi. After creating the back-end endpoints and populating the Supabase tables with mock users, mock notes, problems, and companies, we moved onto the front-end. We designed a website wireframe on Figma before generating a Next.js (React) application that utilizes TypeScript. To allow users to sign in with their Google accounts, we had to rewrite the adapter for Supabase Next.js Authentication because it was originally designed for a JavaScript back-end rather than a Python back-end. Additionally, we used TypeScript validator Zod to standardize our API responses and error messages. Some other aspects of our front-end design include the mobile-first design approach, using contexts to maintain a global state for all data (users, notes, companies, problems), Zod schemas for API data responses, and a fetcher file to request data from any URL endpoint. To maintain the growing complexity of our project, we used a Kanban board within GitHub Projects to manage weekly goals for future, in progress, and completed tasks. Additionally, we had weekly meetings to track our progress and documented the progress of the project on a google document.
