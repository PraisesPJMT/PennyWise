const jwt = require('jsonwebtoken');

require('dotenv').config();

// Authorize user
const authorize = (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res
      .status(403)
      .json({ message: 'Access token is require for this content!' });
  }

  try {
    const verify = jwt.verify(token, process.env.DB_SECRETE);

    req.user = verify.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authorize;
