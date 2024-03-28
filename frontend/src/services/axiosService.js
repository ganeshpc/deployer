import axios from 'axios';

const axiosService = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_BASE_URL || 'http://localhost:9000',
});

axiosService.interceptors.request.use(
  async (config) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      !window.location.href.includes('/login')
    ) {
      localStorage.removeItem('authToken');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosService;
