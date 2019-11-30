import { Action, RequestReducer, State, XXX } from '@/http/requestTypes';
import { useReducer } from 'react';
import { AxiosRequestConfig } from 'axios';
import request from '@/http/axiosConfig';

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
const useRequest = (options: AxiosRequestConfig) => {
  const initialState: State = {
    response: null,
    error: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(requestReducer, initialState);
  const fetch = (url: string, config?: AxiosRequestConfig) => {
    dispatch({ type: 'pending' });
    return request(url, { ...options, ...config }).then(
      response => {
        dispatch({ type: 'success', response });
        return response;
      },
      error => {
        dispatch({ type: 'error', error });
        return Promise.reject(error);
      },
    );
  };
  return { ...state, fetch };
};
export default useRequest;
