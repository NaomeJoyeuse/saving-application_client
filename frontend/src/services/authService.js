

import clientAxios from './clientAxios';

class AuthService {
  async registerCustomer({ email, password, fullName }) {
    try {
      const deviceId = `DV-${Math.random().toString(36).substring(2, 12).toUpperCase()}`;

      const response = await clientAxios.post('/auth/register', {
        email,
        password,
        fullName,
        deviceId,
      });

 
      const { message, data } = response.data;

      
      localStorage.setItem('deviceId', deviceId);

      return { message, data };
    } catch (error) {
    
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async loginCustomer({ email, password }) {
    try {

      const response = await clientAxios.post('/auth/login', {
        email,
        password,
      });

      const { message, data } = response.data;

   
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return { message, data };
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('deviceId');
  }
}

export const authService = new AuthService();
export default AuthService;
