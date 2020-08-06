const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

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

module.exports = router;
