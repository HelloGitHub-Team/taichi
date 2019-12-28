import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import echarts from 'echarts';
import { Card, Col, Row } from 'antd';
import ChartWrapper from '@/components/ChartWrapper/ChartWrapper';

import EChartOption = echarts.EChartOption;

function genData() {
  const nameList = [
    '赵',
    '钱',
    '孙',
    '李',
    '周',
    '吴',
    '郑',
    '王',
    '冯',
    '陈',
    '褚',
    '卫',
    '蒋',
    '沈',
    '韩',
    '杨',
    '朱',
    '秦',
    '尤',
    '许',
    '何',
    '吕',
    '施',
    '张',
    '孔',
    '曹',
    '严',
    '华',
    '金',
    '魏',
    '陶',
    '姜',
    '戚',
    '谢',
    '邹',
    '喻',
    '柏',
    '水',
    '窦',
    '章',
    '云',
    '苏',
    '潘',
    '葛',
    '奚',
    '范',
    '彭',
    '郎',
    '鲁',
    '韦',
    '昌',
    '马',
    '苗',
    '凤',
    '花',
    '方',
    '俞',
    '任',
    '袁',
    '柳',
    '酆',
    '鲍',
    '史',
    '唐',
    '费',
    '廉',
    '岑',
    '薛',
    '雷',
    '贺',
    '倪',
    '汤',
    '滕',
    '殷',
    '罗',
    '毕',
    '郝',
    '邬',
    '安',
    '常',
    '乐',
    '于',
    '时',
    '傅',
    '皮',
    '卞',
    '齐',
    '康',
    '伍',
    '余',
    '元',
    '卜',
    '顾',
    '孟',
    '平',
    '黄',
    '和',
    '穆',
    '萧',
    '尹',
    '姚',
    '邵',
    '湛',
    '汪',
    '祁',
    '毛',
    '禹',
    '狄',
    '米',
    '贝',
    '明',
    '臧',
    '计',
    '伏',
    '成',
    '戴',
    '谈',
    '宋',
    '茅',
    '庞',
    '熊',
    '纪',
    '舒',
    '屈',
    '项',
    '祝',
    '董',
    '梁',
    '杜',
    '阮',
    '蓝',
    '闵',
    '席',
    '季',
    '麻',
    '强',
    '贾',
    '路',
    '娄',
    '危',
  ];
  const legendData: never[] = [];
  const seriesData = [];
  const selected = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 50; i++) {
    const name = Math.random() > 0.65 ? `${makeWord(4, 1)}·${makeWord(3, 0)}` : makeWord(2, 1);
    // @ts-ignore
    legendData.push(name);
    seriesData.push({
      name,
      value: Math.round(Math.random() * 100000),
    });
    selected[name] = i < 6;
  }

  return {
    legendData,
    seriesData,
    selected,
  };

  function makeWord(max: number, min: number) {
    const nameLen = Math.ceil(Math.random() * max + min);
    const name = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < nameLen; i++) {
      name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
    }
    return name.join('');
  }
}
const data = genData();
const options: EChartOption = {
  title: { text: '统计来源', subtext: '纯属虚构' },
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
    data: data.legendData,
    selected: data.selected,
  },
  series: [
    {
      name: '姓名',
      type: 'pie',
      radius: '55%',
      center: ['40%', '50%'],
      data: data.seriesData,
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
const Statistics = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 6000);
  return (
    <PageHeaderWrapper>
      <Row gutter={24}>
        <Col span={12}>
          <Card bordered={false}>
            <ChartWrapper loading={loading} height="400px" width="100%" options={options} />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <ChartWrapper loading={loading} height="400px" width="100%" options={options} />
          </Card>
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};

export default Statistics;
