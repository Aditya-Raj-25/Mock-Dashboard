import axios from 'axios';
import { useAppStore } from '@/store/useAppStore';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://mock-backend-hintro.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor — dynamically inject x-user-id from the Zustand store
axiosClient.interceptors.request.use(
  (config) => {
    const userId = useAppStore.getState().user?.id || 'u1';
    if (config.headers) {
      config.headers['x-user-id'] = userId;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — unwrap response.data
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
// feat: create axios services - updated at Thu May 21 20:37:21 IST 2026
