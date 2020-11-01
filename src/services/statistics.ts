import { AxiosRequestConfig } from 'axios';

export interface IHomeViewParams {
  start_time?: number;
  end_time?: number;
  event?: string;
}

export interface ChartFunctionMap {
  index: number;
  key: string;
  fun: (param: any) => void;
  loading?: boolean;
}

// 获取首页汇总展示数据
export const fetchHomeView: AxiosRequestConfig = { url: '/api/v1/traffic/views/' };

// 获取用户访问来源统计数据
export const fetchFromView: AxiosRequestConfig = { url: '/api/v1/traffic/from/view/' };

// 获取用户访问来源详细数据
export const fetchFromDetail: AxiosRequestConfig = { url: '/api/v1/traffic/from/detail/' };

// 获取推荐项目点击统计数据
export const fetchClickView: AxiosRequestConfig = { url: '/api/v1/traffic/click/view/' };

// 获取推荐项目点击详细数据
export const fetchClickDetail: AxiosRequestConfig = { url: '/api/v1/traffic/click/detail/' };

// 获取某一期月刊的统计数据
export const fetchPeriodView: AxiosRequestConfig = { url: '/api/v1/traffic/periodical/view/' };

// 获取某一期月刊的详细数据
export const fetchPeriodDetail: AxiosRequestConfig = { url: '/api/v1/traffic/periodical/detail/' };
