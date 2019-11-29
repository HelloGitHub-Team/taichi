import { AxiosRequestConfig } from 'axios';
import { Action, RequestReducer, State, XXX } from '@/http/requestTypes';
import { useReducer } from 'react';
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
const useRequest = (url: string, options: AxiosRequestConfig) => {
  const initialState: State = {
    response: null,
    error: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(requestReducer, initialState);
  dispatch({ type: 'pending' });
  request(url, options).then(
    response => {
      dispatch({ type: 'success', response });
    },
    error => {
      dispatch({ type: 'error', error });
    },
  );
  return { ...state };
};
export default useRequest;
