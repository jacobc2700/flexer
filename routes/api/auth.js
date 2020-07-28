const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

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

module.exports = router;
