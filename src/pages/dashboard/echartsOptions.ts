import moment from 'moment';
import echarts from 'echarts';

import EChartsResponsiveOption = echarts.EChartsResponsiveOption;
import EChartOption = echarts.EChartOption;

export interface RootObject {
  end_time: number;
  view_data: FromView | RepoView | VolumeView;
  // from_view: FromView;
  // repo_view: RepoView;
  start_time: number;
  // volume_view: VolumeView;
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

export type IEchartsOption = EChartOption | EChartsResponsiveOption;
const processFromViewOptions = (fromView: FromView | null): IEchartsOption => {
  let copyData: IData[] = [];
  if (fromView) {
    copyData = fromView.data.map(item => ({
      name: item.referrer,
      value: item.count,
    }));
  }
  if (copyData.length === 0) {
    return {};
  }
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)',
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
        type: 'pie',
        radius: '55%',
        center: ['45%', '50%'],
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
const processRepoViewOptions = (repoView: RepoView | null): IEchartsOption => {
  let counts: number[] = [];
  let ipCounts: number[] = [];
  let timestamps: string[] = [];
  if (repoView) {
    const repoViewData = repoView.data;
    counts = repoViewData.map(data => data.count);
    ipCounts = repoViewData.map(data => data.ip_count);
    timestamps = repoViewData.map(data =>
      moment(data.timestamp * 1000).format('YYYY年 MM月DD日 HH:mm:ss'),
    );
  }
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#bfbfbf',
        },
      },
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
      axisLine: {
        lineStyle: {
          color: '#bfbfbf',
        },
      },
      axisLabel: {
        color: '#5b5b5b',
        formatter: (value: string) => {
          const [, month, time] = value.split(' ');
          return `${month}\n${time}`;
        },
        lineHeight: 18,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '点击数量',
        axisLine: {
          lineStyle: {
            color: '#d48265',
          },
        },
      },
      {
        type: 'value',
        name: 'IP数量',
        axisLine: {
          lineStyle: {
            color: '#749f83',
          },
        },
      },
    ],
    series: [
      {
        name: '点击数量',
        type: 'line',
        data: counts,
        yAxisIndex: 0,
        itemStyle: {
          color: '#d48265',
        },
      },
      {
        name: 'IP数量',
        type: 'line',
        data: ipCounts,
        yAxisIndex: 1,
        itemStyle: {
          color: '#749f83',
        },
      },
    ],
  };
};
const processNoticeViewOptions = (noticeView: RepoView | null): IEchartsOption => {
  let counts: number[] = [];
  let ipCounts: number[] = [];
  let timestamps: string[] = [];
  if (noticeView) {
    const noticeViewData = noticeView.data;
    counts = noticeViewData.map(data => data.count);
    ipCounts = noticeViewData.map(data => data.ip_count);
    timestamps = noticeViewData.map(data =>
      moment(data.timestamp * 1000).format('YYYY年 MM月DD日 HH:mm:ss'),
    );
  }
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#bfbfbf',
        },
      },
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
      axisLine: {
        lineStyle: {
          color: '#bfbfbf',
        },
      },
      axisLabel: {
        color: '#5b5b5b',
        formatter: (value: string) => {
          const [, month, time] = value.split(' ');
          return `${month}\n${time}`;
        },
        lineHeight: 18,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '点击数量',
        axisLine: {
          lineStyle: {
            color: '#f0bf57',
          },
        },
      },
      {
        type: 'value',
        name: 'IP数量',
        axisLine: {
          lineStyle: {
            color: '#466624',
          },
        },
      },
    ],
    series: [
      {
        name: '点击数量',
        type: 'line',
        data: counts,
        yAxisIndex: 0,
        itemStyle: {
          color: '#f5d769',
        },
      },
      {
        name: 'IP数量',
        type: 'line',
        data: ipCounts,
        yAxisIndex: 1,
        itemStyle: {
          color: '#466624',
        },
      },
    ],
  };
};
interface IVolumeViewData {
  name: string;
  data: number[];
  type: string;
}

const processVolumeView = (volumeView: VolumeView | null): IEchartsOption => {
  let volumeViewData: IVolumeViewData[] = [];
  if (volumeView) {
    const volumeDataTemp = volumeView.data;
    volumeViewData = volumeDataTemp.map(data => ({
      name: data.category_name,
      data: [data.count],
      type: 'bar',
    }));
  }
  if (volumeViewData.length === 0) {
    return {};
  }
  return {
    tooltip: {
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
    },
    grid: {
      left: '3%',
      right: 160,
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#bfbfbf',
          },
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#ebebeb',
          },
        },
        axisLabel: {
          color: '#5b5b5b',
        },
      },
    ],
    series: volumeViewData,
  };
};
export {
  processFromViewOptions,
  processRepoViewOptions,
  processVolumeView,
  processNoticeViewOptions,
};
