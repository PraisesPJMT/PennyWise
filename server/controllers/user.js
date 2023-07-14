const express = require('express');
const authorize = require('../Middlewares/authorization');

const router = express.Router();

const { User, Group } = require('../models');

// Get all users
router.get('/', authorize, async (req, res) => {
  try {
    const users = await User.findAll();

    return res
      .status(200)
      .json({ data: users, message: 'Users retrieved successfully!' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get a user
router.get('/:user_id', authorize, async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    return res
      .status(200)
      .json({ data: user, message: 'User retrieved successfully!' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:user_id', authorize, async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist!' });
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

    return res
      .status(200)
      .json({ data: updatedUser, message: 'User updated successfully!' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete('/:user_id', authorize, async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const deletedGroups = await Group.destroy({ where: { user_id } });

    console.log('Destroyed Groups: ', deletedGroups);

    await user.destroy();

    return res
      .status(200)
      .json({ data: user, message: 'User deleted successfully!' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
