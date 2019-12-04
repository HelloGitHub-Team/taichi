import { AxiosRequestConfig } from 'axios';

export interface CodeMessage {
  200: string;
  201: string;
  202: string;
  204: string;
  400: string;
  401: string;
  403: string;
  404: string;
  406: string;
  410: string;
  422: string;
  500: string;
  502: string;
  503: string;
  504: string;
}

export type Action =
  | { type: 'pending' }
  | { type: 'success'; response: any }
  | { type: 'error'; error: any };

export interface State {
  response: null | ResponseData;
  error: any;
  loading: boolean;
}
export interface RequestReducer {
  (state: State, action: Action): State;
}
export interface ResponseData {
  payload: any;
  message: string;
}

export interface RequestConfig<T = any> extends AxiosRequestConfig {
  params?: T;
  data?: T;
}
