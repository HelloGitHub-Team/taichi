import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, DatePicker, Table, Select, Button, message } from 'antd';
import moment from 'moment';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import { PaginationConfig, SorterResult, ColumnProps } from 'antd/lib/table/interface';
import {
  LangsClassParams,
  LangsDetailParams,
  fetchLangsClass,
  fetchLangsDetail,
  Asc,
} from '@/services/summary';

import styles from './Summary.less';
import request from '@/http/axiosRequest';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface TableItem {
  description: string;
  forks: number;
  is_chinese: boolean;
  name: string;
  primary_lang: string;
  repo_pushed_time: number;
  stars: number;
  url: string;
}

const Summary = () => {
  const columns: ColumnProps<TableItem>[] = [
    {
      title: '项目名',
      dataIndex: 'name',
      sortDirections: ['descend'],
      render: (name, record) => (
        <Button type="link" href={record.url} target="_blank">
          {name}
        </Button>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '语言',
      dataIndex: 'primary_lang',
    },
    {
      title: 'stars',
      dataIndex: 'stars',
      sorter: true,
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'forks',
      dataIndex: 'forks',
      sorter: true,
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '是否中文',
      dataIndex: 'is_chinese',
      render: (chs: string) => (chs ? '是' : '否'),
      width: 100,
    },
    {
      title: '最近一次更新',
      dataIndex: 'repo_pushed_time',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (time: number) => moment.unix(time).fromNow(),
      width: 150,
    },
  ];

  const [loading, setLoading] = useState(true);
  const [cate, setCate] = useState<string[]>(['ALL']);
  const [date, setDate] = useState<RangePickerValue>([moment().subtract(1, 'day'), moment()]);
  const [lang, setLang] = useState<string>('ALL');
  const [list, setList] = useState([]);
  const [page, setPage] = useState<number | undefined>(1);
  const [count, setCount] = useState<number>(0);
  const [order, setOrder] = useState('stars');
  const [asc, setAsc] = useState<Asc>(0);
  const [change, setChange] = useState<number>(0);

  const fetchCate = (params: LangsClassParams) => {
    request<LangsClassParams>({ ...fetchLangsClass, params }).then(
      response => {
        setCate(['ALL'].concat(response.payload.langs));
        setChange(0);
      },
      () => {
        setLoading(false);
      },
    );
  };

  const fetchList = (params: LangsDetailParams) => {
    setLoading(true);
    request<LangsDetailParams>({ ...fetchLangsDetail, params }).then(
      response => {
        setList(response.payload.data);
        setCount(response.payload.count);
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
    );
  };

  const handleRangeDate = ([startTime, endTime]: RangePickerValue) => {
    if (typeof startTime === 'undefined' || typeof endTime === 'undefined') {
      return;
    }
    const dateSetFormat = { hour: 0, minute: 0, second: 0 };
    const startStamps: number = startTime.set(dateSetFormat).unix();
    const endStamps: number = endTime.set(dateSetFormat).unix();
    if (startStamps === endStamps) {
      message.warning('请选择一个范围');
      return;
    }
    if (startStamps !== moment(date[0]).unix() || endStamps !== moment(date[1]).unix()) {
      setChange(1);
      setDate([startTime, endTime]);
    }
  };

  const handleChange = (value: string) => {
    setLang(value);
  };

  const onChange = (
    pagination: PaginationConfig,
    filters: Record<never, string[]>,
    sorter: SorterResult<TableItem>,
  ) => {
    setOrder(sorter.field);
    setAsc(sorter.order === 'descend' ? 0 : 1);
    setPage(pagination.current);
  };

  useEffect(() => {
    const [startStamps, endStamps] = [moment(date[0]).unix(), moment(date[1]).unix()];
    fetchCate({ start_time: startStamps, end_time: endStamps });
  }, []);

  useEffect(() => {
    const [startStamps, endStamps] = [moment(date[0]).unix(), moment(date[1]).unix()];
    fetchList({
      start_time: startStamps,
      end_time: endStamps,
      lang: lang === 'ALL' ? '' : lang,
      page,
      order,
      asc,
    });
  }, [page, order, asc]);

  const clickSearch = () => {
    const [startStamps, endStamps] = [moment(date[0]).unix(), moment(date[1]).unix()];
    if (change === 1) {
      fetchCate({ start_time: startStamps, end_time: endStamps });
    }
    if (page === 1) {
      fetchList({
        start_time: startStamps,
        end_time: endStamps,
        lang: lang === 'ALL' ? '' : lang,
        page,
        order,
        asc,
      });
    } else {
      setPage(1);
    }
  };

  return (
    <PageHeaderWrapper className={styles.summary}>
      <Card>
        <div className={styles.search}>
          <RangePicker
            onChange={handleRangeDate}
            value={date}
            format="YYYY-MM-DD"
            allowClear={false}
          />
          <Select defaultValue={lang} style={{ width: 120 }} onChange={handleChange}>
            {cate.map(item => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Button type="primary" onClick={clickSearch}>
            搜索
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={list}
          onChange={onChange}
          loading={loading}
          rowKey="url"
          pagination={{
            current: page,
            pageSize: 10,
            total: count,
          }}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default Summary;
