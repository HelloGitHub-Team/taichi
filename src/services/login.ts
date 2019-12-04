import request from '@/http/axiosRequest';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request({
    url: '/api/login/account',
    method: 'POST',
    data: params,
  });
}
