const { User } = require('../../lib/sequelize');
const Service = require('../service');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

class UserService extends Service {
  static createAccount = async (req) => {
    try {
      const { username, email, password } = req.body;

      const isUsernameEmailRegisterd = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (isUsernameEmailRegisterd) {
        return this.handleError({
          message: 'username is not available or email has been registered',
          statusCode: 400,
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 5);

      await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return this.handleSuccess({
        message: 'new account created',
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: 'Server Error',
        statusCode: 500,
      });
    }
  };
}

module.exports = UserService;
