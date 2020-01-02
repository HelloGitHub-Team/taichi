import moment from 'moment';
import { isEmptyObject } from '@/utils/helper';

export interface RootObject {
  end_time: number;
  from_view: FromView;
  repo_view: RepoView;
  start_time: number;
  volume_view: VolumeView;
}

export interface VolumeView {
  all_count: number;
  all_ip_count: number;
  data: Datum3[];
  volume_id: number;
  volume_name: string;
}

export interface Datum3 {
  category_id: number;
  category_name: string;
  count: number;
}

export interface RepoView {
  all_count: number;
  all_ip_count: number;
  data: Datum2[];
  per: string;
}

export interface Datum2 {
  count: number;
  ip_count: number;
  timestamp: number;
}

export interface FromView {
  all_count: number;
  data: Datum[];
}

export interface Datum {
  count: number;
  id: number;
  percent: number;
  referrer: string;
}
interface IData {
  name: string;
  value: number;
}
const processFromViewOptions = (fromView: FromView | {}) => {
  let copyData: IData[] = [];
  if (!isEmptyObject(fromView)) {
    copyData = (fromView as FromView).data.map(item => ({
      name: item.referrer,
      value: item.count,
    }));
  }
  return {
    title: { text: '统计来源' },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
    },
    series: [
      {
        name: '来源',
        type: 'pie',
        radius: '55%',
        center: ['40%', '50%'],
        data: copyData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
};
const processRepoViewOptions = (repoView: RepoView | {}) => {
  let counts: number[] = [];
  let ipCounts: number[] = [];
  let timestamps: string[] = [];
  if (!isEmptyObject(repoView)) {
    const repoViewData = (repoView as RepoView).data;
    counts = repoViewData.map(data => data.count);
    ipCounts = repoViewData.map(data => data.ip_count);
    timestamps = repoViewData.map(data =>
      moment(data.timestamp * 1000).format('YYYY年MM月DD日 HH:mm'),
    );
  }
  return {
    title: {
      text: '推荐项目点击数据',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timestamps,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '点击数量',
        type: 'line',
        stack: '总量',
        data: counts,
      },
      {
        name: 'IP数量',
        type: 'line',
        stack: '总量',
        data: ipCounts,
      },
    ],
  };
};
interface IVolumeViewData {
  name: string;
  data: number[];
  type: string;
}
const processVolumeView = (volumeView: VolumeView | {}) => {
  let volumeViewData: IVolumeViewData[] = [];
  if (!isEmptyObject(volumeView)) {
    const volumeDataTemp = (volumeView as VolumeView).data;
    volumeViewData = volumeDataTemp.map(data => ({
      name: data.category_name,
      data: [data.count],
      type: 'bar',
    }));
  }
  return {
    title: {
      text: '月刊',
    },
    tooltip: {
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      type: 'scroll',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [{ type: 'category' }],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: volumeViewData,
  };
};
export { processFromViewOptions, processRepoViewOptions, processVolumeView };
