const express = require('express');
const router = express.Router();

//below: document the route => private routes need tokens

//@route    GET api/profile
//@desc     Test route
//@access   Public
router.get('/', (req, res) => {
  res.send('Profile route');
});

module.exports = router;
