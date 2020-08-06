# flexer

Social media website for computer programmers.

### Technologies:

- MongoDB (Mongoose): JSON-style database for persistent data.
-

### Hosting:

- MongoDB Atlas: hosting service for our MongoDB database.
- Heroku: deployment service for hosting our web application.

learn header body response http guide

### db

default avatar - http://www.gravatar.com/avatar/?s=200&r=pg&d=mm
make sure jwt token is set to expiresIn 3600 seconds

### Usage:

- `git clone https://github.com/jacobc2700/flexer.git`.
- Create a `.env` file in the root directory and add these secret keys.

```
DATABASE
```

- `npm install`.
- `npm run server`.
- Go to localhost:5000.

opotion to have publicly displayed email.

npm run server

make a env file and put DATABASE_URL with username, password, dbname
also in env, set JWT_SECRET=any string u want

### Npm scripts

### Endpoints:

### Models:

- Profile:
- User

### NPM Packages:

### Folder Structure:

- Entry file: `server.js`.

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

-dotenv

### Postman:

- Here is some info on the Postman collections and endpoints.
- Posts:
- Profiles:
- Users & Authentication (4):
- GET: Get Authenticated User

within postman, create new collection called "Users & Auth"
possibly share them since they are bidned to an account

- for users and authentication

collection: Posts
collection: Profiles

POST: localhost:5000/api/users (saved within Users & Auth collection as "Register User")
JSON body:
{
"name" : "Jacob"
}

multiple collections and saved requests...

### problems to fix:

- user should not have empty whitespace as name

### http requests

await/async in simple terms!
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
https://javascript.info/async-await
s
