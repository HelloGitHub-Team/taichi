import { AxiosRequestConfig } from 'axios';

export interface IHomeViewParams {
  start_time?: number;
  end_time?: number;
}

export const fetchHomeView: AxiosRequestConfig = { url: '/api/v1/traffic/views/' };
