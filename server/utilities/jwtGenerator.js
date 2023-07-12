const jwt = require('jsonwebtoken');

require('dotenv').config();

// Generate JWT Token
const generateJWT = (user_id) => {
  const payload = {
    user: { id: user_id },
  };

  return jwt.sign(payload, process.env.DB_SECRETE, { expiresIn: '1h' });
};

module.exports = generateJWT;
