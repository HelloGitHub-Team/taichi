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

export interface XXX {
  data?: any;
  error?: any;
}
export type Action =
  | { type: 'pending' }
  | { type: 'success'; response: any }
  | { type: 'error'; error: any };

export interface State {
  response: any;
  error: any;
  loading: boolean;
}
export interface RequestReducer {
  (state: XXX, action: Action): State;
}