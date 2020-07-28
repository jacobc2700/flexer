const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

//below: document the route => private routes need tokens

//below: adding 'auth' makes the protected route which requires a decoded json web token

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get('/', auth, async (req, res) => {
  try {
    // .select: doesn't return password
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server error on authentication route.');
  }
});

//@route    POST api/auth
//@desc     Authenticate a user and get JSON web token
//@access   Public
router.post(
  '/',
  [
    body('email', 'A valid email address is required.').isEmail(),
    body('password', 'Please enter a password.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //If there are errors with the input...
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructuring:
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      //If the user with the typed email does not exist...
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials.' }] });
      }

      //Check if typed password is same as stored password.
      const passwordIsMatch = await bcrypt.compare(password, user.password);

      //Password is wrong.
      if (!passwordIsMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials.' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      //Return JSON web token.
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 }, //1 hour or 3600 seconds for production, longer for testing purposes
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );

      // res.send('User was registered successfully.');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error with user registration.');
    }

    // console.log(req.body);
  }
);

module.exports = router;
