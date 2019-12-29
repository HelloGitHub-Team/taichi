import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import styles from './Statistics.less';
import ChartWrapper from '@/components/ChartWrapper/ChartWrapper';

import { options1, options2, options3 } from '@/pages/dashboard/echartsOptions';

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 6000);
  return (
    <PageHeaderWrapper className={styles.statistics}>
      <Card className={styles.card} bordered={false}>
        <ChartWrapper loading={loading} height="400px" width="100%" options={options1} />
      </Card>
      <Card className={styles.card} bordered={false}>
        <ChartWrapper loading={loading} height="400px" width="100%" options={options2} />
      </Card>
      <Card className={styles.card} bordered={false}>
        <ChartWrapper loading={loading} height="400px" width="100%" options={options3} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default Statistics;
