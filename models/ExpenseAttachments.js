'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseAttachments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExpenseAttachments.init(
    {
      file: DataTypes.STRING,
      expense_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'expense_attachment',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return ExpenseAttachments;
};
