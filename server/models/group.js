'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    }

    toJSON() {
      return { ...this.get(), user_id: undefined };
    }
  }
  Group.init(
    {
      group_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
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
          notEmpty: { msg: 'Description can not be an empty string!' },
        },
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Icon is required!' },
          notEmpty: { msg: 'Icon can not be an empty string!' },
        },
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Theme is required!' },
          notEmpty: { msg: 'Theme can not be an empty string!' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Group',
      tableName: 'groups',
    }
  );
  return Group;
};
