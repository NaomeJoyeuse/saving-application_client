const db = require('../models');
const { BalanceDTO, TransactionDTO, AccountDTO } = require('../dtos/accountDtos');
const { AppError } = require('../middleware/errorhandling');

const Account = db.Account;
const Transaction = db.Transaction;

class AccountService {
  // Get account balance
  async getBalance(userId) {
    try {
      const account = await Account.findOne({ where: { userId } });

      if (!account) {
        throw new AppError(404, 'Account not found');
      }

      return new BalanceDTO(account.balance);
    } catch (error) {
      throw error;
    }
  }

  // Get account details
  async getAccount(userId) {
    try {
      const account = await Account.findOne({ where: { userId } });

      if (!account) {
        throw new AppError(404, 'Account not found');
      }

      return new AccountDTO(account);
    } catch (error) {
      throw error;
    }
  }

  // Deposit money
  async deposit(userId, amount, description) {
    try {
      const account = await Account.findOne({ where: { userId } });

      if (!account) {
        throw new AppError(404, 'Account not found');
      }

      const balanceBefore = parseFloat(account.balance);
      const balanceAfter = balanceBefore + amount;

      // Create transaction
      const transaction = await Transaction.create({
        accountId: account.id,
        type: 'DEPOSIT',
        amount,
        balanceBefore,
        balanceAfter,
        description,
      });

      // Update account balance
      await account.update({ balance: balanceAfter });

      return {
        success: true,
        message: 'Deposit successful',
        transaction: new TransactionDTO(transaction),
        newBalance: new BalanceDTO(balanceAfter),
      };
    } catch (error) {
      throw error;
    }
  }

  // Withdraw money
  async withdraw(userId, amount, description) {
    try {
      const account = await Account.findOne({ where: { userId } });

      if (!account) {
        throw new AppError(404, 'Account not found');
      }

      const balanceBefore = parseFloat(account.balance);

      // Check sufficient balance
      if (balanceBefore < amount) {
        throw new AppError(400, `Insufficient balance. Available: ${balanceBefore}`);
      }

      const balanceAfter = balanceBefore - amount;

      // Create transaction
      const transaction = await Transaction.create({
        accountId: account.id,
        type: 'WITHDRAW',
        amount,
        balanceBefore,
        balanceAfter,
        description,
      });

      // Update account balance
      await account.update({ balance: balanceAfter });

      return {
        success: true,
        message: 'Withdrawal successful',
        transaction: new TransactionDTO(transaction),
        newBalance: new BalanceDTO(balanceAfter),
      };
    } catch (error) {
      throw error;
    }
  }

  // Get transaction history
  async getTransactionHistory(userId, limit = 20, offset = 0) {
    try {
      const account = await Account.findOne({ where: { userId } });

      if (!account) {
        throw new AppError(404, 'Account not found');
      }

      const transactions = await Transaction.findAll({
        where: { accountId: account.id },
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']],
      });

      const total = await Transaction.count({
        where: { accountId: account.id },
      });

      return {
        success: true,
        data: transactions.map((t) => new TransactionDTO(t)),
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Check low balance (for alerts)
  async checkLowBalance(userId, threshold = 1000) {
    try {
      const account = await Account.findOne({ where: { userId } });

      if (!account) {
        throw new AppError(404, 'Account not found');
      }

      const balance = parseFloat(account.balance);
      const isLow = balance < threshold;

      return {
        balance: new BalanceDTO(balance),
        isLow,
        threshold,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AccountService;