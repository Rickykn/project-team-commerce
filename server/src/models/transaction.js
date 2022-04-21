const { DataTypes } = require("sequelize");

const Transaction = (sequelize) => {
  return sequelize.define("Transaction", {
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
module.exports = Transaction;
