import React, { useEffect } from 'react';
import { fetchTest } from '@/services/testRequest';
import { Card, Table } from 'antd';
import useRequest from '@/http/request';

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

const ExampleTable = () => {
  // const [dataSource, setDataSource] = useState([]);
  // useEffect(() => {
  //   fetchTest().then(
  //     (response: any) => {
  //       setDataSource(response.payload);
  //     },
  //     error => {
  //       console.log('error', error);
  //     },
  //   );
  // }, []);
  const { response, loading, fetch } = useRequest({ url: fetchTest });
  const dataSource = response ? response.payload : [];
  useEffect(() => {
    fetch().then();
  }, []);
  return (
    <Card>
      <Table loading={loading} dataSource={dataSource} columns={columns} />
    </Card>
  );
};

export default ExampleTable;
