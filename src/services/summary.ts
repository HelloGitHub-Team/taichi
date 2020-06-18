import { AxiosRequestConfig } from 'axios';

export interface LangsClassParams {
  start_time?: number;
  end_time?: number;
}

export type Asc = 0 | 1;

export interface LangsDetailParams extends LangsClassParams {
  lang?: string;
  page?: number;
  order?: string;
  asc?: Asc;
}
// 获取某搜索时间段内的语言分类
export const fetchLangsClass: AxiosRequestConfig = { url: '/api/v1/daily/langs/' };

// 获取 GitHub 上收集项目在某个时间段某种语言的详细数据
export const fetchLangsDetail: AxiosRequestConfig = { url: '/api/v1/daily/report/' };
