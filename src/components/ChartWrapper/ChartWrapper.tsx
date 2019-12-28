import React, { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import echarts from 'echarts';
import { Spin } from 'antd';
import { connect } from 'dva';
import _uniqueId from 'lodash/uniqueId';
import styles from './ChartWrapper.less';
import { ConnectState } from '@/models/connect';

import EChartsResponsiveOption = echarts.EChartsResponsiveOption;
import EChartOption = echarts.EChartOption;
import ECharts = echarts.ECharts;

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  height: string;
  options: EChartOption | EChartsResponsiveOption;
  width?: string;
  loading?: boolean;
  collapsed: boolean;
}
const ChartWrapper: FC<IProps> = ({
  className,
  height,
  options,
  style,
  width,
  loading = false,
  collapsed,
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chartRef = useRef<ECharts>(null!);
  const idRef = useRef<string>(_uniqueId('chart-'));
  const onResize = () => {
    if (timerRef.current) return;
    timerRef.current = setTimeout(() => {
      chartRef.current.resize();
      timerRef.current = null;
    }, 70);
  };
  useEffect(() => {
    const chartWrapper = document.querySelector(`#${idRef.current}`);
    chartRef.current = echarts.init(chartWrapper as HTMLDivElement);
    chartRef.current.setOption(options);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  useEffect(() => {
    setTimeout(() => {
      chartRef.current.resize();
    }, 200);
  }, [collapsed]);
  useEffect(() => {
    chartRef.current.setOption(options);
  }, [options]);
  return (
    <Spin spinning={loading}>
      <div
        id={idRef.current}
        className={classNames(className, styles.chartWrapper)}
        style={{ height, width, ...style }}
      />
    </Spin>
  );
};

export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
}))(ChartWrapper);
