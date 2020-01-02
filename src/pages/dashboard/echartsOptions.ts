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
  let timestamps: number[] = [];
  if (!isEmptyObject(repoView)) {
    const repoViewData = (repoView as RepoView).data;
    counts = repoViewData.map(data => data.count);
    ipCounts = repoViewData.map(data => data.ip_count);
    timestamps = repoViewData.map(data => data.timestamp);
  }
  return {
    title: {
      text: '推荐项目点击数据',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['点击数量', 'IP数量'],
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
const options2 = {
  title: {
    text: '推荐项目点击数据',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['点击数量', 'IP数量'],
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
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '点击数量',
      type: 'line',
      stack: '总量',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'IP数量',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
  ],
};
const options3 = {
  title: {
    text: '月刊',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  legend: {
    data: [
      '直接访问',
      '邮件营销',
      '联盟广告',
      '视频广告',
      '搜索引擎',
      '百度',
      '谷歌',
      '必应',
      '其他',
    ],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '直接访问',
      type: 'bar',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: '邮件营销',
      type: 'bar',
      stack: '广告',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '联盟广告',
      type: 'bar',
      stack: '广告',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '视频广告',
      type: 'bar',
      stack: '广告',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: '搜索引擎',
      type: 'bar',
      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
    },
    {
      name: '百度',
      type: 'bar',
      barWidth: 5,
      stack: '搜索引擎',
      data: [620, 732, 701, 734, 1090, 1130, 1120],
    },
    {
      name: '谷歌',
      type: 'bar',
      stack: '搜索引擎',
      data: [120, 132, 101, 134, 290, 230, 220],
    },
    {
      name: '必应',
      type: 'bar',
      stack: '搜索引擎',
      data: [60, 72, 71, 74, 190, 130, 110],
    },
    {
      name: '其他',
      type: 'bar',
      stack: '搜索引擎',
      data: [62, 82, 91, 84, 109, 110, 120],
    },
  ],
};
export { processFromViewOptions, processRepoViewOptions, options2, options3 };
