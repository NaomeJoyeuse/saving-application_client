const express = require('express');
const AccountController = require('../controllers/accountController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
const accountController = new AccountController();

router.use(authMiddleware);

router.get('/balance', (req, res, next) =>
  accountController.getBalance(req, res, next)
);
router.get('/details', (req, res, next) =>
  accountController.getAccount(req, res, next)
);
router.get('/transactions', (req, res, next) =>
  accountController.getTransactionHistory(req, res, next)
);

router.get('/low-balance', (req, res, next) =>
  accountController.checkLowBalance(req, res, next)
);

router.post('/deposit', (req, res, next) =>
  accountController.deposit(req, res, next)
);


router.post('/withdraw', (req, res, next) =>
  accountController.withdraw(req, res, next)
);

module.exports = router;