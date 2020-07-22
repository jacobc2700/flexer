### packages

### Usage;

npm run server

make a env file and put DATABASE_URL with username, password, dbname

### Npm scripts

### Endpoints:

### Models:

### Folder structure:

- server.js entry file

- regular:
- express
- express-validator: validate the user input
- bcryptjs
- config
- gravatar
- jsonwebtoken
- mongoose

- dev dependencies:
  -nodemon
- concurrently

-dotenv???

### Postman

within postman, create new collection called "Users & Auth"

- for users and authentication

collection: Posts
collection: Profiles

POST: localhost:5000/api/users (saved within Users & Auth collection as "Register User")
JSON body:
{
"name" : "Jacob"
}

### problems to fix:

- user should not have empty whitespace as name
