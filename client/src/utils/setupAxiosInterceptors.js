import api from './axiosConfig';
import { refreshToken, logout } from '../store/slices/authSlice';

const setupAxiosInterceptors = (store) => {
  api.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const result = await store.dispatch(refreshToken());
          if (refreshToken.fulfilled.match(result)) {
            return api(originalRequest);
          }
        } catch (e) {
          store.dispatch(logout());
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors; 