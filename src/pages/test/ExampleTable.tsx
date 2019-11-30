import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import { fetchTest } from '@/services/testRequest';
import request from '@/http/axiosConfig';
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
interface TestParams {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}
const ExampleTable = () => {
  const [dataSource1, setDataSource1] = useState([]);
  const params: TestParams = {
    userName: 'userName',
    password: 'password',
    mobile: 'mobile',
    captcha: 'captcha',
  };
  useEffect(() => {
    request(fetchTest, { params, method: 'get' }).then(
      response => {
        setDataSource1(response.payload);
      },
      error => {
        console.log('error', error);
      },
    );
  }, []);
  console.log(dataSource1);
  const { response, loading, fetch } = useRequest(fetchTest, { method: 'post' });
  const dataSource = response ? response.payload : [];
  useEffect(() => {
    fetch({ params }).then();
  }, []);
  return (
    <Card>
      <Table loading={loading} dataSource={dataSource} columns={columns} />
    </Card>
  );
};

export default ExampleTable;
