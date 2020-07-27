const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Docs: https://www.npmjs.com/package/gravatar
const gravatar = require('gravatar');

//Docs: https://express-validator.github.io/docs/
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //If there are errors with the input...
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructuring:
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      //See if user exists.
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists.' }] });
      }

      //Get user gravatar based on email.
      const avatar = gravatar.url(email, {
        s: '200', //Size
        r: 'pg', //Rating: pg for family friendly
        d: 'mm', //Default: shows a default image if the user has no gravatar
      });

      //Create the new user.
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Encrypt password w/10 rounds.
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //Save user to database.
      await user.save();

      //Return JSON web token.

      res.send('User was registered successfully.');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error with user registration.');
    }

    // console.log(req.body);
  }
);

module.exports = router;
