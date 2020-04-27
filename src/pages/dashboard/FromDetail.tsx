import React, { useEffect, useMemo, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table } from 'antd';
import styles from './Detail.less';
import { fetchFromDetail, fetchFromView, IHomeViewParams } from '@/services/statistics';
import request from '@/http/axiosRequest';
import ChartWrapper from '@/components/ChartWrapper/ChartWrapper';
import { Datum, processFromDetailOptions, RootObject } from '@/pages/dashboard/fromDetailOptions';
import { columns } from '@/pages/dashboard/detailColumns';
import useFormTable, { IPageKey } from '@/customHooks/useFormTable/useFormTable';

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

const getViewTableData = (pageKey: IPageKey) =>
  request<any, IDataSource>({ ...fetchFromDetail, ...pageKey }).then(response => ({
    total: response.payload.page_count,
    list: response.payload.data,
  }));
const FromDetail = () => {
  const [optionsOrigin, setOptionsOrigin] = useState<Datum[]>([]);
  const { tableProps } = useFormTable(getViewTableData);
  const getViewOptions = () => {
    request<IHomeViewParams, RootObject>({ ...fetchFromView }).then(response => {
      setOptionsOrigin(response.payload.data);
    });
  };
  const options = useMemo(() => processFromDetailOptions(optionsOrigin), [optionsOrigin]);
  useEffect(() => {
    getViewOptions();
  }, []);
  return (
    <PageHeaderWrapper className={styles.staticsDetail}>
      <Card className={styles.card} title="用户访问来源统计数据" bordered={false}>
        <ChartWrapper height={400} options={options} />
      </Card>
      <Card className={styles.card} title="用户访问来源详细数据" bordered={false}>
        {/* 表格需要的功能：1. 分页(跳转页码，总条数，切换页码时携带查询条件) 2. 搜索 3. 排序 */}
        <Table {...tableProps} columns={columns} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default FromDetail;
