'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Group }) {
      // define association here
      this.belongsTo(Group, { foreignKey: 'group_id', as: 'group' });
    }

    toJSON() {
      return { ...this.get(), group_id: undefined };
    }
  }
  expense.init(
    {
      expense_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      group_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Title is required!' },
          notEmpty: { msg: 'Title can not be an empty string!' },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Description is required!' },
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Icon is required!' },
          notEmpty: { msg: 'Icon can not be an empty string!' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Expense',
      tableName: 'expenses',
    }
  );
  return expense;
};
