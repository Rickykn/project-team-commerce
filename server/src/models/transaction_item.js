const { DataTypes } = require("sequelize");

const TransactionItem = (sequelize) => {
  return sequelize.define("Transaction_item", {
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};

module.exports = TransactionItem;
