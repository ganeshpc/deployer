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

// TODO: Add a response interceptor to handle errors
// axiosService.interceptors.response.use()

export default axiosService;
