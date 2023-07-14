const express = require('express');
const generateJWT = require('../utilities/jwtGenerator');
const authorize = require('../Middlewares/authorization');

require('dotenv').config();

const { User } = require('../models');

const bcrypt = require('bcrypt');
const router = express.Router();

const SALT = Number(process.env.SALT) || 10;

// Register user
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const emailUser = await User.findOne({ where: { email } });

    if (emailUser) {
      return res
        .status(409)
        .json({ message: 'User with email address exist!' });
    }

    const salt = await bcrypt.genSalt(SALT);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      first_name,
      last_name,
      email,
      harshed_password: bcryptPassword,
    });

    return res
      .status(201)
      .json({ data: user, message: 'User created successfully!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await User.findAll();

    if (users.length < 1) {
      return res.status(401).json({ message: 'Invalid login credentials!' });
    }

    const logUser = await User.findOne({ where: { email } });

    if (!logUser) {
      return res.status(401).json({ message: 'Invalid login credentials!' });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      logUser.harshed_password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid login credentials!' });
    }

    const token = generateJWT(logUser.user_id);

    return res
      .status(200)
      .json({ data: logUser, token, message: 'User logged in successfully!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Verify user
router.get('/verify', authorize, (req, res) => {
  try {
    return res.status(200).json({ data: true, message: 'User is verified!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
