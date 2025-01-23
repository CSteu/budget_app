import axios from 'axios';
import router from '@/router';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, 
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API error:', error.response || error.message);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('authToken');
        router.push('/login');
      }
      return Promise.reject(error);
    }
  );

export default api;