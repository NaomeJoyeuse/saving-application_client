
import clientAxios from './clientAxios';

class AccountService {
  async getBalance() {
    const response = await clientAxios.get('/account/balance');
    return response.data;
  }

  async getAccountDetails() {
    const response = await clientAxios.get('/account/details');
    return response.data;
  }

  async getTransactionHistory(limit = 20, offset = 0) {
    const response = await clientAxios.get('/account/transactions', {
      params: { limit, offset },
    });
    return response.data;
  }

  async checkLowBalance(threshold = 1000) {
    const response = await clientAxios.get('/account/low-balance', {
      params: { threshold },
    });
    return response.data;
  }

  async deposit(amount, description) {
    const response = await clientAxios.post('/account/deposit', { amount, description });
    return response.data;
  }

  async withdraw(amount, description) {
    const response = await clientAxios.post('/account/withdraw', { amount, description });
    return response.data;
  }
}

export const accountService = new AccountService();
export default AccountService;
