const { Sequelize } = require('sequelize');
const mysqlConfig = require('../configs/database');

const sequelize = new Sequelize({
  username: mysqlConfig.MYSQL_USERNAME,
  password: mysqlConfig.MYSQL_PASSWORD,
  database: mysqlConfig.MYSQL_DB_NAME,
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

//models

const User = require('../models/user')(sequelize);
const Cart = require('../models/cart')(sequelize);
const Product = require('../models/product')(sequelize);
const Transaction = require('../models/transaction')(sequelize);
const Transaction_item = require('../models/transaction_item')(sequelize);

// 1:M user and cart
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user_carts' });
User.hasMany(Cart, { foreignKey: 'user_id', as: 'user_carts' });

// 1:M product and cart
Cart.belongsTo(Product, { foreignKey: 'user_id', as: 'product_carts' });
Product.hasMany(Cart, { foreignKey: 'user_id', as: 'product_carts' });

// 1:M User and transaction
Transaction.belongsTo(User, { foreignKey: 'user_id', as: 'user_transactions' });
User.hasMany(Transaction, { foreignKey: 'user_id', as: 'user_transactions' });

// 1:M transaction and transaction item
Transaction_item.belongsTo(Transaction, {
  foreignKey: 'transaction_id',
  as: 'user_transaction_item',
});
Transaction.hasMany(Transaction_item, {
  foreignKey: 'transaction_id',
  as: 'user_transaction_item',
});

// 1:M product and trancation_item
Transaction_item.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product_transaction',
});
Product.hasMany(Transaction_item, {
  foreignKey: 'product_id',
  as: 'product_transaction',
});

module.exports = {
  sequelize,
  User,
  Cart,
  Product,
  Transaction,
  Transaction_item,
};
