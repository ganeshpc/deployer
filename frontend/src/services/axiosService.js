import axios from 'axios';

const axiosService = axios.create({
  baseURL: import.meta.env.API_SERVER_BASE_URL || 'http://localhost:9000',
});

axiosService.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
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
