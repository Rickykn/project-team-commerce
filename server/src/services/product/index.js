const { Product } = require("../../lib/sequelize");
const Service = require("../service");
const { Op } = require("sequelize");

class ProductService extends Service {
  static getAllProducts = async (req) => {
    try {
      const {
        _limit = 30,
        _page = 1,
        _sortBy = "",
        _sortDir = "",
        product_name,
      } = req.query;

      delete req.query._limit;
      delete req.query._page;
      delete req.query._sortBy;
      delete req.query._sortDir;

      const findProduct = await Product.findAndCountAll({
        where: {
          ...req.query,
          product_name: {
            [Op.like]: `%${product_name}%`,
          },
        },
        limit: _limit ? parseInt(_limit) : undefined,
        offset: (_page - 1) * _limit,
        order: _sortBy ? [[_sortBy, _sortDir]] : undefined,
        distinct: true,
      });

      if (!findProduct.rows.length) {
        return this.handleError({
          message: "No posts found",
          statusCode: 400,
        });
      }

      return this.handleSuccess({
        message: "Find all products",
        data: findProduct,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };
}

module.exports = ProductService;
