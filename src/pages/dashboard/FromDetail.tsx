import React, { useEffect, useMemo, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table } from 'antd';
import styles from './Detail.less';
import { fetchFromDetail, fetchFromView, IHomeViewParams } from '@/services/statistics';
import request from '@/http/axiosRequest';
import ChartWrapper from '@/components/ChartWrapper/ChartWrapper';
import { Datum, processFromDetailOptions, RootObject } from '@/pages/dashboard/detailOptions';
import { columns } from '@/pages/dashboard/detailColumns';

interface IDataSource {
  start_time: number;
  end_time: number;
  per: string;
  all_count: number;
  all_ip_count: number;
  current_page: number;
  page_count: number;
  order: string;
  data: IDataSourceDatum[];
}

interface IDataSourceDatum {
  id: number;
  referrer: string;
  count: number;
  percent: number;
}

const FromDetail = () => {
  const [optionsOrigin, setOptionsOrigin] = useState<Datum[]>([]);
  const [dataSource, setDataSource] = useState<IDataSourceDatum[]>([]);
  const getViewOptions = () => {
    request<IHomeViewParams, RootObject>({ ...fetchFromView }).then(response => {
      setOptionsOrigin(response.payload.data);
    });
  };
  const getViewTableData = () => {
    request<any, IDataSource>({ ...fetchFromDetail }).then(response => {
      setDataSource(response.payload.data);
    });
  };
  const options = useMemo(() => processFromDetailOptions(optionsOrigin), [optionsOrigin]);
  useEffect(() => {
    getViewOptions();
    getViewTableData();
  }, []);
  return (
    <PageHeaderWrapper className={styles.staticsDetail}>
      <Card className={styles.card} title="用户访问来源统计数据" bordered={false}>
        <ChartWrapper height={400} options={options} />
      </Card>
      <Card className={styles.card} title="用户访问来源详细数据" bordered={false}>
        {/* 表格需要的功能：1. 分页(跳转页码，总条数，切换页码时携带查询条件) 2. 搜索 3. 排序 */}
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default FromDetail;
