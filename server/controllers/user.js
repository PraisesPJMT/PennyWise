const express = require('express');
const authorize = require('../Middlewares/authorization');

const router = express.Router();

const { User } = require('../models');

// Get all users
router.get('/', authorize, async (req, res) => {
  try {
    const users = await User.findAll();

    res
      .status(200)
      .json({ data: users, message: 'Users retrieved successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get a users
router.get('/:user_id', authorize, async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      res.status(404).json({ message: 'User does not exist!' });
    }

    res
      .status(200)
      .json({ data: user, message: 'User retrieved successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:user_id', authorize, async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      res.status(404).json({ message: 'User does not exist!' });
    }

    const {
      first_name,
      last_name,
      email,
      funds,
      show_funds,
      comput_funds,
      currency,
    } = req.body;

    if (email && user.email !== email) {
      const emailUser = await User.findOne({ where: { email } });

      if (emailUser) {
        res.status(409).json({ message: 'User with email address exist!' });
      } else {
        user.email = email;
      }
    }

    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (funds) user.funds = funds;
    if (show_funds) user.show_funds = show_funds;
    if (comput_funds) user.comput_funds = comput_funds;
    if (currency) user.currency = currency;

    const updatedUser = await user.save();

    res
      .status(200)
      .json({ data: updatedUser, message: 'User updated successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
