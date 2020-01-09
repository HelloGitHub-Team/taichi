import { useReducer } from 'react';
import { RequestConfig, RequestReducer, State } from '@/http/requestTypes';
import request from '@/http/axiosRequest';

const requestReducer: RequestReducer = (state, action) => {
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
const useRequest = <Req, Res>(options?: RequestConfig<Req>) => {
  const initialState: State = {
    response: null,
    error: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(requestReducer, initialState);
  const fetch = (config?: RequestConfig<Req>) => {
    dispatch({ type: 'pending' });
    return request<Req, Res>({ ...options, ...config }).then(
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
