import axios from 'axios';
console.log('REACT_APP_BASE_URL:', process.env.REACT_APP_BASE_URL);

const clientAxios = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
});

clientAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

clientAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, redirecting to login...');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default clientAxios;
