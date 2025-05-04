import { message } from 'antd';
import axios from 'axios';
import { getAccessToken } from './storage';
const HOST = import.meta.env.VITE_APP_BASE_API;
const PREFIX = import.meta.env.VITE_APP_BASE_API_PREFIX;
const baseURL = `${HOST}/${PREFIX}`;

const http = axios.create({
  baseURL,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

http.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status <= 300 && response.data.code === 200) {
      return response.data;
    }
    message.error(response.data.message);
    return Promise.reject(response.data);
  },
  error => {
    if (error.status === 401) {
      message.error('登录已过期，请重新登录');
      localStorage.removeItem('persist:root');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default http;
