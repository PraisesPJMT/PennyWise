const express = require('express');
const authorize = require('../Middlewares/authorization');

const router = express.Router();

const { Group, Expense } = require('../models');

// Get all groups
router.get('/', authorize, async (req, res) => {
  try {
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const groups = await Group.findAll({
      where: { user_id },
      include: 'expenses',
    });

    return res
      .status(200)
      .json({ data: groups, message: 'Groups retrieved successfully!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get group
router.get('/:group_id', authorize, async (req, res) => {
  try {
    const { group_id } = req.params;
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const group = await Group.findOne({
      where: { user_id, group_id },
      include: 'expenses',
    });

    if (!group) {
      return res.status(404).json({ message: 'Group does not exist!' });
    }

    return res
      .status(200)
      .json({ data: group, message: 'Group retrieved successfully!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Create group
router.post('/', authorize, async (req, res) => {
  try {
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const { title, description, icon, theme } = req.body;

    const group = await Group.create({
      user_id,
      title,
      description,
      icon,
      theme,
    });

    return res
      .status(201)
      .json({ data: group, message: 'Group created successfully!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Update group
router.put('/:group_id', authorize, async (req, res) => {
  try {
    const { group_id } = req.params;
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const group = await Group.findOne({ where: { group_id } });

    if (!group) {
      return res.status(404).json({ message: 'Group does not exist!' });
    }

    const { title, description, icon, theme } = req.body;

    group.title = title;
    group.description = description;
    group.icon = icon;
    group.theme = theme;

    await group.save();

    return res
      .status(200)
      .json({ data: group, message: 'Group updated successfully!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Delete group
router.delete('/:group_id', authorize, async (req, res) => {
  try {
    const { group_id } = req.params;
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const group = await Group.findOne({ where: { group_id } });

    if (!group) {
      return res.status(404).json({ message: 'Group does not exist!' });
    }

    await Expense.destroy({ where: { group_id } });

    await group.destroy();

    return res
      .status(200)
      .json({ data: group, message: 'Group deleted successfully!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
