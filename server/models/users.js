'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Group }) {
      // define association here
      this.hasMany(Group, { foreignKey: 'user_id', as: 'group' });
    }

    toJSON() {
      return { ...this.get(), harshed_password: undefined };
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'First name is required!' },
          notEmpty: { msg: 'First name can not be an empty string!' },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Last name is required!' },
          notEmpty: { msg: 'Last name can not be an empty string!' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'Please enter a valid email!' },
          notNull: { msg: 'Email name is required!' },
          notEmpty: { msg: 'Email name can not be an empty string!' },
        },
      },
      harshed_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      funds: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      show_funds: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      compute_funds: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USD',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );
  return User;
};
