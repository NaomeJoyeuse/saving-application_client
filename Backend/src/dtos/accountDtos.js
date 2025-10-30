class BalanceDTO {
  constructor(balance) {
    this.balance = parseFloat(balance) || 0;
    this.currency = 'RWF';
  }
}

class TransactionDTO {
  constructor(transaction) {
    this.id = transaction.id;
    this.type = transaction.type; 
    this.amount = parseFloat(transaction.amount);
    this.balanceBefore = parseFloat(transaction.balanceBefore);
    this.balanceAfter = parseFloat(transaction.balanceAfter);
    this.description = transaction.description;
    this.createdAt = transaction.createdAt;
  }
}

class AccountDTO {
  constructor(account) {
    this.id = account.id;
    this.accountNumber = account.accountNumber;
    this.balance = parseFloat(account.balance) || 0;
    this.createdAt = account.createdAt;
    this.updatedAt = account.updatedAt;
  }
}

module.exports = { BalanceDTO, TransactionDTO, AccountDTO };