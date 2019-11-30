import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import { fetchTest } from '@/services/testRequest';
import useRequest from '@/http/request';
import request from '@/http/axiosConfig';

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
  const [dataSource1, setDataSource1] = useState([]);
  useEffect(() => {
    request(fetchTest).then(
      response => {
        setDataSource1(response.payload);
      },
      error => {
        console.log('error', error);
      },
    );
  }, []);
  console.log(dataSource1);
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
