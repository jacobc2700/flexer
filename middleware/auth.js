const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //Get token from header.
  const token = req.header('x-auth-token');

  //Check if there is no token.
  if (!token) {
    //Not authorized.
    return res.status(401).json({ message: 'No token: authorization denied.' });
  }

  //Verify existing token.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (err) {
    //Runs if the token is invalid.
    res.status(401).json({ message: 'Invalid token.' });
  }
};
