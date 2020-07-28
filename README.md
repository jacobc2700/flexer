### packages

### Technologies

### db

default avatar - http://www.gravatar.com/avatar/?s=200&r=pg&d=mm

make sure jwt token is set to expiresIn 3600 seconds

### Usage;

npm run server

make a env file and put DATABASE_URL with username, password, dbname
also in env, set JWT_SECRET=any string u want

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

### http requests

await/async in simple terms!
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
https://javascript.info/async-await
s
