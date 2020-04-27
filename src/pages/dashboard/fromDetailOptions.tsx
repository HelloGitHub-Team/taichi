import moment from 'moment';

export interface RootObject {
  all_count: number;
  data: Datum[];
  end_time: number;
  per: string;
  start_time: number;
}

export interface Datum {
  count: number;
  id: number;
  percent: number;
  referrer: string;
  timeline: Timeline[];
}

interface Timeline {
  count: number;
  timestamp: number;
}

export const processFromDetailOptions = (options: Datum[]) => {
  const series = options.map(item => ({
    name: item.referrer,
    type: 'line',
    data: item.timeline.map(subItem => subItem.count),
  }));
  // FIXME: 这里如何能使TypeScript报错？
  const timestamps = options[0]
    ? options[0].timeline.map(item => moment(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss'))
    : [];
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#bfbfbf',
        },
      },
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: timestamps,
      axisLine: {
        lineStyle: {
          color: '#bfbfbf',
        },
      },
      axisLabel: {
        color: '#5b5b5b',
      },
    },
    yAxis: {
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
    series,
  };
};
