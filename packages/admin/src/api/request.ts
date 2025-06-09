import { message } from 'antd';
import axios from 'axios';

// 创建 axios 实例
const service = axios.create({
  baseURL: '/prod-api',
  timeout: 10000,
  withCredentials: true, // 允许跨域携带 cookie
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这里可以添加 token 等认证信息
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 200) {
      return res;
    }
    message.error(res.msg || '请求失败');
    return Promise.reject(res);
  },
  error => {
    message.error(error.message || '网络错误');
    return Promise.reject(error);
  },
);

export default service;
