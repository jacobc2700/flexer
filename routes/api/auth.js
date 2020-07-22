const express = require('express');
const router = express.Router();

//below: document the route => private routes need tokens

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get('/', (req, res) => {
  res.send('Auth route');
});

module.exports = router;
