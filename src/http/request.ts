import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import { Dispatch, ReducerAction, useReducer } from 'react';
import { Action, CodeMessage, RequestReducer, State, XXX } from '@/http/requestTypes';

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
const axiosInstance = axios.create({ timeout: 10000, baseURL: '' });
const handleResponse = (response: AxiosResponse): XXX => {
  const { data, status } = response;
  if (status === STATUS_OK) {
    return { data };
  }
  message.error(data.message || codeMessage[status]);
  return { error: data };
};

const requestReducer: RequestReducer = (state: XXX, action: Action) => {
  switch (action.type) {
    case 'pending':
      return {
        response: null,
        error: null,
        loading: true,
      };
    case 'success':
      return {
        response: action.response,
        error: null,
        loading: false,
      };
    case 'error':
      return {
        response: null,
        error: action.error,
        loading: false,
      };
    default:
      return {
        response: null,
        error: null,
        loading: false,
      };
  }
};

const request = async (
  url: string,
  options: AxiosRequestConfig,
  dispatch: Dispatch<ReducerAction<RequestReducer>>,
) => {
  dispatch({ type: 'pending' });
  const response = await axiosInstance(url, options);
  const { data, error } = handleResponse(response);
  if (data) {
    dispatch({ type: 'success', response: data });
    return { data };
  }
  dispatch({ type: 'error', error });
  return { error };
};
const useRequest = (url: string, options: AxiosRequestConfig) => {
  const initialState: State = {
    response: null,
    error: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(requestReducer, initialState);
  request(url, options, dispatch).then(null);
  return { ...state };
};

export default useRequest;
