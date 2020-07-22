const express = require('express');
const router = express.Router();

//Docs: https://express-validator.github.io/docs/
const { body, validationResult } = require('express-validator');

//below: document the route => private routes need tokens

//@route    POST api/users
//@desc     Create a new user w/name, email, password
//@access   Public
router.post(
  '/',
  [
    body('name', 'Full name is required.').not().isEmpty(),
    body('email', 'A valid email address is required.').isEmail(),
    body(
      'password',
      'Please enter a password with six or more characters.'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //If there are errors with the input...
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send('User route');
  }
);

module.exports = router;
