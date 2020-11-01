import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';
import { CodeMessage, RequestConfig, ResponseData } from '@/http/requestTypes';

const STATUS_OK = 200;
const codeMessage: CodeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
const { MOCK, NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';
const axiosInstance = axios.create({
  timeout: 20000,
  baseURL: MOCK ? '' : 'https://hellogithub.com',
});
axiosInstance.interceptors.request.use(
  config => {
    // 开发环境下通过头部信息请求接口
    if (isDevelopment) {
      // eslint-disable-next-line global-require
      config.headers['X-HG-TOKEN'] = require('@/secretKeys').token;
    }
    return config;
  },
  error => {
    message.error('请求异常');
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const { status } = response;
    if (status === STATUS_OK) {
      return response;
    }
    return Promise.reject(response);
  },
  error => {
    const { status } = error.response || {};
    if (codeMessage[status]) {
      message.error(codeMessage[status]);
    } else {
      message.error('网络异常');
    }
    return Promise.reject(error);
  },
);

const request = <Req, Res = any>(config: RequestConfig<Req> = {}) =>
  axiosInstance(config).then((response: AxiosResponse<ResponseData<Res>>) => response.data);

export default request;
