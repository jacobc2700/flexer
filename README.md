# Flexer

Social media website for computer programmers.

### Technologies (MERN):

- Flexer is built with the JavaScript MERN Stack.
- MongoDB (Mongoose): JSON-style database for persistent data.
- Express: web framework for Node.js.
- React: front-end framework for making the website look pretty.
- Node.js: server-side JavaScript client.

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
DATABASE_URL=Link to Mongo Atlas Database URL with username, password, and database name.
JWT_SECRET=Random string for JSON web token authentication.
```

- `npm install`.
- `npm run server`.
- Go to localhost:5000.

opotion to have publicly displayed email.
github topics: adding new skills

### Npm scripts

### Database Model Objects:

- Profile: associated with exactly one user.
- User: represents a person who logs in to the website.

### NPM Packages:

### Detailed Project Structure:

- `README.md`: provides documentation about Flexer (written in Markdown).
- `package-lock.json`: auto-generated file (you can ignore).
- `package.json`: lists our scripts and dependencies.
- We have a `start` script for production and a `dev` script for development.
- Here are some of the packages we're using:
- `bcryptjs`: for hashing passwords using mainly 3 methods => genSalt (more rounds = more secure), hash (turn password into an unreadable string), compare (compares the typed password to the hashed password).
- `config`:

* Entry file: `server.js`.
* regular:
* express
* express-validator: validate the user input
* config
* gravatar
* jsonwebtoken
* mongoose

* dev dependencies:
* nodemon
* concurrently
* dotenv
* lodash

### Postman Endpoints:

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

await method for ALL mongoose methods since they return promises

multiple collections and saved requests...
header presets too
when to use headers.bodies

### problems to fix:

- user should not have empty whitespace as name

### http requests

await/async in simple terms!
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
https://javascript.info/async-await
s

### Problems:

- use lodash to capitalize every first letter of each woird in str

### License:

- Flexer is under the [MIT License](LICENSE).

### Credits:

- Based on a [Udemy](https://www.udemy.com/course/mern-stack-front-to-back/) course by Brad Traversy.
