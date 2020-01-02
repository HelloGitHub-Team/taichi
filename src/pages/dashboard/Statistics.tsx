import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import styles from './Statistics.less';
import ChartWrapper from '@/components/ChartWrapper/ChartWrapper';
import {
  FromView,
  options3,
  processFromViewOptions,
  processRepoViewOptions,
  RepoView,
  RootObject,
} from '@/pages/dashboard/echartsOptions';
import { fetchHomeView, IHomeViewParams } from '@/services/Statistics';
import request from '@/http/axiosRequest';

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [fromView, setFromView] = useState<FromView | {}>({});
  const [repoView, setRepoView] = useState<RepoView | {}>({});
  // const [volumeView, setVolumeView] = useState({});
  useEffect(() => {
    setLoading(true);
    request<IHomeViewParams, RootObject>(fetchHomeView).then(
      response => {
        setLoading(false);
        setFromView(response.payload.from_view);
        setRepoView(response.payload.repo_view);
        // setVolumeView(response.payload.volume_view);
      },
      () => {
        setLoading(false);
      },
    );
  }, []);
  return (
    <PageHeaderWrapper className={styles.statistics}>
      <Card className={styles.card} bordered={false}>
        <ChartWrapper
          loading={loading}
          height="400px"
          width="100%"
          options={processFromViewOptions(fromView)}
        />
      </Card>
      <Card className={styles.card} bordered={false}>
        <ChartWrapper
          loading={loading}
          height="400px"
          width="100%"
          options={processRepoViewOptions(repoView)}
        />
      </Card>
      <Card className={styles.card} bordered={false}>
        <ChartWrapper loading={loading} height="400px" width="100%" options={options3} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default Statistics;
