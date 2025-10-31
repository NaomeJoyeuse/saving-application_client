const AccountService = require('../services/accountService');
const { depositValidator, withdrawValidator } = require('../utils/accountValidation');

const accountService = new AccountService();

class AccountController {
  // Get balance
  async getBalance(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await accountService.getBalance(userId);

      res.status(200).json({
        success: true,
        message: 'Balance retrieved',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get account details
  async getAccount(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await accountService.getAccount(userId);

      res.status(200).json({
        success: true,
        message: 'Account details retrieved',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }


  async deposit(req, res, next) {
    try {
      const userId = req.user.id;
      const { amount, description } = req.body;

      
      const validated = depositValidator({ amount, description });

      const result = await accountService.deposit(
        userId,
        validated.amount,
        validated.description
      );

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Withdraw
  async withdraw(req, res, next) {
    try {
      const userId = req.user.id;
      const { amount, description } = req.body;

      // Validate
      const validated = withdrawValidator({ amount, description });

      const result = await accountService.withdraw(
        userId,
        validated.amount,
        validated.description
      );

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Get transaction history
  async getTransactionHistory(req, res, next) {
    try {
      const userId = req.user.id;
      const { limit = 20, offset = 0 } = req.query;

      const result = await accountService.getTransactionHistory(
        userId,
        limit,
        offset
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Check low balance
  async checkLowBalance(req, res, next) {
    try {
      const userId = req.user.id;
      const { threshold = 1000 } = req.query;

      const result = await accountService.checkLowBalance(
        userId,
        threshold
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AccountController;