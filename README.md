# Flexer

Social media website for computer programmers.

### Technologies (MERN):

- Flexer is built with the JavaScript MERN Stack.
- JavaScript (ES6): http://es6-features.org/.
- MongoDB (Mongoose): JSON-style database for persistent data.
- Express: web framework for Node.js.
- React: front-end framework for making the website look pretty.
- Node.js: server-side JavaScript client.

### Hosting:

- MongoDB Atlas: hosting service for our MongoDB database.
- Heroku: deployment service for hosting our web application.

learn header body response http guide

### db

make sure jwt token is set to expiresIn 3600 seconds

### Usage:

- `git clone https://github.com/jacobc2700/flexer.git`.
- Create a `.env` file in the root directory and add these secret keys.

```
DATABASE_URL=Link to Mongo Atlas Database URL with username, password, and database name.
JWT_SECRET=Random string for JSON web token authentication.
GITHUB_TOKEN=Personal access token from GitHub.
```

- To enable the function where a user's latest GitHub repositories are automatically generated, you will need to get an access token from GitHub.
- Follow the instructions on [this](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) website.
- When creating the personal access token, **DO NOT** select any boxes within the `scopes` section.
- Add the token to the `.env` file.

- `npm install`.
- `npm run server`.
- Go to localhost:5000.

opotion to have publicly displayed email.
github topics: adding new skills

### Rest API:

- How does a REST API work?

### Npm scripts

### Database Model Objects:

- Profile: associated with exactly one user.
- User: represents a person who logs in to the website.
- Post: associated with exactly one user.

### how the auth middleware and jWT tokens work

- jwt tokens carry the usre object with them.

https://www.digitalocean.com/community/tutorials/nodejs-res-object-in-expressjs

### Detailed Project Structure:

- `README.md`: provides documentation about Flexer (written in Markdown).
- `package-lock.json`: auto-generated file (you can ignore).
- `package.json`: lists our scripts and dependencies.
- We have a `start` script for production and a `dev` script for development.
- Here are some of the regular packages (https://www.npmjs.com/)we're using:
- `axios`: for making HTTP requests.
- `bcryptjs`: for hashing passwords using mainly 3 methods => genSalt (more rounds = more secure), hash (turn password into an unreadable string), compare (compares the typed password to the hashed password).
- `dotenv`: load secret environment variables from an environment file (`.env`).
- The `require('dotenv').config()` command in `server.js` enables access to variables in the `.env` file from anywhere in our project directory.
- `express`: web application framework for Node.js.
- `express-validator`: for validating user inputs for creating new profiles and new users before inserting them into the database.
- `gravatar`: finds the image associated with a user's email address or generates a default one for email addresses without an image. Here is the default image: http://www.gravatar.com/avatar/?s=200&r=pg&d=mm.
- `jsonwebtoken`: generates tokens that authorize user logins.
- `lodash`: utility library that has built-in methods for working with arrays, strings, and more.
- `mongoose`: object data modeling (ODM) library which makes working with MongoDB easier.
- `serve-favicon`: serve a favicon for our web application.
- Here are the developer dependencies we're using:
- `concurrently`: runs multiple commands at the same time. We'll need it to run our back-end (Express) and front-end (React) at the same time.
- `nodemon`: automatically restarts our server each time we edit our files.
- Now let's look at the project structure.
- `server.js`: entry file for our web application. Within this file, we create our Express application, connect to our MongoDB database, define our routes, and run the application.
- `LICENSE`: this project is licensed under the MIT license (few restrictions).
- `.gitignore`: ignores certain files when pushing to GitHub.
- `.env`: contains environment variables that you want to keep secret.
- `routes/api`: folder which contains our routes and endpoints.
- `routes/api/auth.js`:

### Postman Endpoints (Custom API):

- All our endpoints in development start with: `localhost:5000/api`.
- Here is some info on the Postman collections and the endpoints within each one.
- We have three different Postman collections: Posts, Profiles, Users & Authentication.
- Posts:
- Profiles (12):
- Users & Authentication (3):
- GET: Get Authenticated User
- POST: Register User
- POST: Log In User

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

make sure check status codes

multiple collections and saved requests...
header presets too
when to use headers.bodies

### http requests

await/async in simple terms!
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
https://javascript.info/async-await
s

### Problems:

- use lodash to capitalize every first letter of each woird in str
- White space should not be allowed
- if current is true, there must be no "to" field
- if current is false, there must be a "to" field

### License:

- Flexer is under the [MIT License](LICENSE).

### Credits:

- Based on a [Udemy](https://www.udemy.com/course/mern-stack-front-to-back/) course by Brad Traversy.
