const { DataTypes } = require("sequelize");

const Cart = (sequelize) => {
  return sequelize.define("Cart", {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
module.exports = Cart;
