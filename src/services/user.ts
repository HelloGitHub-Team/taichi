import request from '@/http/axiosRequest';

export async function query(): Promise<any> {
  return request({ url: '/api/users' });
}

export async function queryCurrent(): Promise<any> {
  return request({ url: '/api/currentUser' });
}
