const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

//below: document the route => private routes need tokens

//@route    GET api/profile/me
//@desc     Get the current user profile
//@access   Private
router.get('/me', auth, async (req, res) => {
  try {
    //Get current profile through user id.
    //Populate method: assign profile user name and avatar.
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user.' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error getting current profile.');
  }
});

//@route    POST api/profile
//@desc     Create or update existing user profile
//@access   Private
router.post(
  '/',
  [
    auth,
    [
      body('status', 'Status (developer, student) is required.')
        .not()
        .isEmpty(),
      body('skills', 'Skills (python, java, html) is required.')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //If there are errors...
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

module.exports = router;
