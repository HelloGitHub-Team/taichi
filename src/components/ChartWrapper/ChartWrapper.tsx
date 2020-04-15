import React, { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import echarts from 'echarts';
import { Spin, Empty } from 'antd';
import { connect } from 'dva';
import _uniqueId from 'lodash/uniqueId';
import styles from './ChartWrapper.less';
import { ConnectState } from '@/models/connect';
import { isEmptyObject } from '@/utils/helper';

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
    if (isEmptyObject(options)) return undefined;
    if (!chartRef.current) {
      const chartWrapper = document.querySelector(`#${idRef.current}`);
      chartRef.current = echarts.init(chartWrapper as HTMLDivElement);
    }
    chartRef.current.setOption(options);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [options]);
  useEffect(() => {
    if (isEmptyObject(options)) return;
    setTimeout(() => {
      chartRef.current.resize();
    }, 200);
  }, [collapsed]);
  const elementStyle = { height, width, ...style };
  return (
    <Spin spinning={loading}>
      {isEmptyObject(options) ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div
          id={idRef.current}
          className={classNames(className, styles.chartWrapper)}
          style={elementStyle}
        />
      )}
    </Spin>
  );
};

export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
}))(ChartWrapper);
