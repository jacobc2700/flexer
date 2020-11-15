update comments.

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

Make sure you watch SASS through VSCODE

### db

make sure jwt token is set to expiresIn 3600 seconds

front-end packages vs back-end pakges

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
- `npm run dev`.
- Open up localhost:5000 (back-end) and localhost:3000 (front-end).

opotion to have publicly displayed email.
github topics: adding new skills

### Rest API:

- How does a REST API work?

### NPM Scripts:

```
"scripts": {
    "start": "node server",
    "server": "nodemon server",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
}
```

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

### Server Packages (NPM):

### Client Packages (NPM):

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

### Async, Await, Promise:

- Why are we using `async` and `await` for all our mongoose methods? (https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- `async` keyword before a function means that you can use `await` within the function.
- `async` functions return promises.
- A `Promise` contains a value which is not necessarily known at the time it's created:
- Instead of returning a value like a synchronous function, an `async` function "promises" to return the value at some point in the future.
- A `Promise` is either pending (initial state - value not known yet), fulfilled (value has been returned successfully), or rejected (error).
- `await` is always called within in an `async` function and usually wrapped within a `try catch error` block.
- `await` keyword only works within `async` functions.
- `await` makes JavaScript wait until a promise settles and fulfills returning a value: `let value = await promise`.
- When the code gets to an `await` keyword, function execution stops until the promise settles and a value is fulfilled.

```
async function demo() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise Fulfilled"), 1000);
  });

  let result = await promise; //Wait until the promise resolves and a value is returned.

  alert(result); // "Promise Fulfilled"
}

demo();
```

Path parameters: key-value pairs that belong to URL path -> /users/123 (USE WHEN IDENTIFYING RESOURCE)
-> before quetsion mark, looks like a vairable that belongs

Query string: key-value pairs after the question mark (?) -> /users?id=123 (USE WHEN SORTING/FILTERING ITEMS)

/users # Fetch a list of users
/users?occupation=programer # Fetch a list of programer user
/users/123 # Fetch a user who has id 123

req.query = query params

req.query comes from query parameters in the URL such as http://foo.com/somePath?name=ted where req.query.name === "ted"

All three properties are populated from different sources:

req.query comes from query parameters in the URL such as http://foo.com/somePath?name=ted where req.query.name === "ted".

req.params comes from path segments of the URL that match a parameter in the route definition such a /song/:songid. So, with a route using that designation and a URL such as /song/48586, then req.params.songid === "48586".

req.body properties come from a form post where the form data (which is submitted in the body contents) has been parsed into properties of the body tag.

PUT/POST = usually read the body
GET = usually reads the path params

Usually the content body is used for the data that is to be uploaded/downloaded to/from the server and the query parameters are used to specify the exact data requested

### React & Concurrently:

- Run `npx create-react-app client` to create a new React app which will be stored in a folder named `client`.
- Added a proxy to the package.json file in the client-side folder, for axios:
  "proxy": "http://localhost:5000"

### Problems:

- use lodash to capitalize every first letter of each woird in str
- White space should not be allowed
- if current is true, there must be no "to" field
- if current is false, there must be a "to" field
- make sure to kepe same id when updating experience, education, or the comment

### New Features:

- Dark Mode
- Like & Dislike Comments

### Redux:

- Component-level state in react: register/login forms
- data put in input fields get stored in copmonent level state
- State manager which acts like a cloud over our web app which we can submit actions through events to get data
- to fall into our component.
- authentication, profile, posts = app level state which should be able to be accessed from anywhere in the app
- Redux gives us app-level state.
- Profile data from MongoDB gets put into a redux store,

https://www.w3schools.com/react/react_state.asp

### React Within Flexer:

- `React` is being served from the `client` folder.
- `StrictMode` is enabled, which helps find potential problems in the app (https://reactjs.org/docs/strict-mode.html).
- `Fragments` should be used instead of container `<div></div>` tags (https://reactjs.org/docs/fragments.html).
- `React Router` manages the different routes of the web app (https://reactrouter.com/web/example/basic).
- `useState` is a React hook for storing state variables inside functional components (component-level state).
- When the state variable is changed by using `setState`, the component re-renders so the user can see it immediately.
- The web app will immediately update the click total with each new click on the button:

```
import React, { useState } from 'react';

function Example() {
  //Declare a new state variable which represents how many clicks you made.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        Click Me
      </button>
    </div>
  );
}
```

- "racf" on the vscode will auto-gen boilerplate (snipets extension)

how to make a request:

```
//Make a new user object with certain properties.
const newUser = {
  name: name,
  email: email,
  password: password,
  confirmPassword: confirmPassword,
};

try {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
    },
  };

  //Converts object into a string.
  const body = JSON.stringify(newUser);

  const response = await axios.post('/api/users', body, config);

  console.log(response.data);

} catch (err) {
  console.log(err.response.data);
}
```

### Visual Studio Code Extensions

### License:

- Flexer is licensed under the [MIT License](LICENSE).

### Credits:

- Based on a [Udemy](https://www.udemy.com/course/mern-stack-front-to-back/) course by Brad Traversy.
