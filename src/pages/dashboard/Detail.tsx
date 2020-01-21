import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table } from 'antd';
// @ts-ignore
import styles from './Detail.less';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const Detail = () => (
  <PageHeaderWrapper>
    <Card className={styles.card} title="图表" bordered={false}>
      1234
    </Card>
    <Card className={styles.card} title="表格" bordered={false}>
      <Table dataSource={dataSource} columns={columns} />
    </Card>
  </PageHeaderWrapper>
);

export default Detail;
