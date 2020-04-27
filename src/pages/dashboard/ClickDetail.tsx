import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import styles from './Detail.less';
import { fetchClickDetail, fetchClickView } from '@/services/statistics';
import request from '@/http/axiosRequest';
import { Datum, RootObject } from '@/pages/dashboard/fromDetailOptions';
import useFormTable, { IPageKey } from '@/customHooks/useFormTable/useFormTable';

const getViewTableData = (pageKey: IPageKey) =>
  request<any, any>({ ...fetchClickDetail, ...pageKey }).then(response => ({
    total: response.payload.page_count,
    list: response.payload.data,
  }));
const ClickDetail = () => {
  const [, setOptionsOrigin] = useState<Datum[]>([]);
  useFormTable(getViewTableData);
  const getViewOptions = () => {
    request<any, RootObject>({ ...fetchClickView }).then(response => {
      setOptionsOrigin(response.payload.data);
    });
  };
  useEffect(() => {
    getViewOptions();
  }, []);
  return (
    <PageHeaderWrapper className={styles.staticsDetail}>
      <Card className={styles.card} title="推荐项目点击统计数据" bordered={false}>
        图表
      </Card>
      <Card className={styles.card} title="推荐项目点击详细数据" bordered={false}>
        表格
      </Card>
    </PageHeaderWrapper>
  );
};

export default ClickDetail;
