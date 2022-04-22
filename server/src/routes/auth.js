const router = require('express').Router();
const UserService = require('../services/auth');

router.post('/register', async (req, res) => {
  try {
    const serviceResult = await UserService.createAccount(req);

    if (!serviceResult.success) throw serviceResult;

    return res.status(serviceResult.statusCode || 200).json({
      message: serviceResult.message,
    });
  } catch (error) {
    return res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
});

module.exports = router;
