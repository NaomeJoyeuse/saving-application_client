
import clientAxios from './clientAxios';

class AccountService {
  async getBalance() {
    const response = await clientAxios.get('/accounts/balance');
    return response.data;
  }

  async getAccountDetails() {
    const response = await clientAxios.get('/accounts/details');
    return response.data;
  }

  async getTransactionHistory(limit = 20, offset = 0) {
    const response = await clientAxios.get('/accounts/transactions', {
      params: { limit, offset },
    });
    return response.data;
  }

  async checkLowBalance(threshold = 1000) {
    const response = await clientAxios.get('/accounts/low-balance', {
      params: { threshold },
    });
    return response.data;
  }

  async deposit(amount, description) {
    const response = await clientAxios.post('/accounts/deposit', { amount, description });
    return response.data;
  }

  async withdraw(amount, description) {
    const response = await clientAxios.post('/accounts/withdraw', { amount, description });
    return response.data;
  }
}

export const accountService = new AccountService();
export default AccountService;
