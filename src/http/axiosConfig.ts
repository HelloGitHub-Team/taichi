import axios from 'axios';
import { message } from 'antd';

const STATUS_OK = 200;

const request = axios.create({ timeout: 10000, baseURL: 'http://localhost:3000' });
request.interceptors.request.use(
  config => {
    console.log('请求成功');
    return config;
  },
  error => {
    console.log('请求失败');
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  response => {
    console.log('响应成功');
    const { data, status } = response;
    if (status === STATUS_OK) {
      return data;
    }
    return Promise.reject(data);
  },
  error => {
    message.error('网络异常');
    return Promise.reject(error);
  },
);
export default request;

// 请求相关整理：
// 1. 请求统一处理(请求拦截器)
// 2. 请求失败
// 3. 响应统一处理(status)
//    3.1. 响应后的正常信息
//    3.2. 响应后的异常信息
// 4. 响应失败

// 特性：
// 1. 支持async/await调用
// 2. 支持自定义hooks来帮忙处理loading
