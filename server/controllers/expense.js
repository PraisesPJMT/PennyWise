const express = require('express');
const authorize = require('../Middlewares/authorization');

const router = express.Router();

const { Group, Expense } = require('../models');

// Get all expense
router.get('/:group_id/expense', authorize, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { group_id } = req.params;

    if (!user_id) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const group = await Group.findOne({ where: { user_id, group_id } });

    if (!group) {
      return res.status(404).json({ message: 'Group does not exist!' });
    }

    const expense = await Expense.findAll({ where: { group_id } });

    return res
      .status(200)
      .json({ data: expense, message: 'Expenses retrieved successfully!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get expense
router.get('/:group_id/expense/:expense_id', authorize, async (req, res) => {
  try {
    const { group_id, expense_id } = req.params;
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const group = await Group.findOne({ where: { group_id } });

    if (!group) {
      return res.status(404).json({ message: 'Group does not exist!' });
    }

    const expense = await Expense.findOne({ where: { expense_id } });

    if (!expense) {
      return res.status(404).json({ message: 'Expense does not exist!' });
    }

    return res
      .status(200)
      .json({ data: expense, message: 'Expense retrieved successfully!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Create expense
router.post('/:group_id/expense', authorize, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { group_id } = req.params;

    if (!user_id) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const group = await Group.findOne({ where: { user_id, group_id } });

    if (!group) {
      return res.status(404).json({ message: 'Group does not exist!' });
    }

    const { title, description, icon, amount } = req.body;

    const expense = await Expense.create({
      group_id,
      title,
      description,
      icon,
      amount,
    });

    return res
      .status(201)
      .json({ data: expense, message: 'Expense created successfully!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Update expense
router.put('/:group_id/expense/:expense_id', authorize, async (req, res) => {
  try {
    const { group_id, expense_id } = req.params;
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const group = await Group.findOne({ where: { group_id } });

    if (!group) {
      return res.status(404).json({ message: 'Group does not exist!' });
    }

    const expense = await Expense.findOne({ where: { expense_id } });

    if (!expense) {
      return res.status(404).json({ message: 'Expense does not exist!' });
    }

    const { title, description, icon, amount } = req.body;

    expense.title = title;
    expense.description = description;
    expense.icon = icon;
    expense.amount = amount;

    await expense.save();

    return res
      .status(200)
      .json({ data: expense, message: 'Expense updated successfully!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Delete expense
router.delete('/:group_id/expense/:expense_id', authorize, async (req, res) => {
  try {
    const { group_id, expense_id } = req.params;
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const group = await Group.findOne({ where: { group_id } });

    if (!group) {
      return res.status(404).json({ message: 'Group does not exist!' });
    }

    const expense = await Expense.findOne({ where: { expense_id } });

    if (!expense) {
      return res.status(404).json({ message: 'Expense does not exist!' });
    }

    await expense.destroy();

    return res
      .status(200)
      .json({ data: expense, message: 'Expense deleted successfully!' });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
