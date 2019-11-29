import request from '@/http/axiosConfig';

export const fetchTest = () => request('/api/test/success');
