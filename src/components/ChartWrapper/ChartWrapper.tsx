import React, { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import echarts from 'echarts';
import { Spin } from 'antd';
import styles from './ChartWrapper.less';

import EChartsResponsiveOption = echarts.EChartsResponsiveOption;
import EChartOption = echarts.EChartOption;
import ECharts = echarts.ECharts;

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  height: string;
  options: EChartOption | EChartsResponsiveOption;
  width?: string;
  loading?: boolean;
}
const ChartWrapper: FC<IProps> = ({
  className,
  height,
  options,
  style,
  width,
  loading = false,
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chartRef = useRef<ECharts>(null!);
  const onResize = () => {
    if (timerRef.current) return;
    timerRef.current = setTimeout(() => {
      chartRef.current.resize();
      timerRef.current = null;
    }, 70);
  };
  useEffect(() => {
    const chartWrapper = document.querySelector(`.${styles.chartWrapper}`);
    chartRef.current = echarts.init(chartWrapper as HTMLDivElement);
    chartRef.current.setOption(options);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  useEffect(() => {
    chartRef.current.setOption(options);
  }, [options]);

  return (
    <Spin spinning={loading}>
      <div
        className={classNames(className, styles.chartWrapper)}
        style={{ height, width, ...style }}
      ></div>
    </Spin>
  );
};

export default ChartWrapper;
