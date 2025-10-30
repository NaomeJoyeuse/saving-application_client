class AccountDTO {
  static toResponse(account) {
    if (!account) return null;

    return {
      id: account.id,
      accountNumber: account.accountNumber,
      balance: Number(account.balance),
      userId: account.userId,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }
}

module.exports = AccountDTO;
