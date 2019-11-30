import { AxiosRequestConfig } from 'axios';

export interface TestParams {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}
export const fetchTest: AxiosRequestConfig = { url: '/api/test/success', method: 'post' };
