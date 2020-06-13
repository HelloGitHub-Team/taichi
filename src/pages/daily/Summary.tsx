import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, DatePicker, Table, Select, Button } from 'antd';
import moment from 'moment';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import { SortOrder, PaginationConfig, SorterResult } from 'antd/lib/table/interface';
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

interface ColumnItem {
  title: string;
  dataIndex: string;
  sorter?: boolean;
  sortDirections?: Array<SortOrder>;
  defaultSortOrder?: 'descend' | 'ascend';
}

const Summary = () => {
  const columns: ColumnItem[] = [
    {
      title: '项目名',
      dataIndex: 'name',
      sortDirections: ['descend'],
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '语言',
      dataIndex: 'lang',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'stars',
      dataIndex: 'stars',
      sorter: true,
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '更新时间',
      dataIndex: 'repo_pushed_time',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const [loading, setLoading] = useState(true);
  const [cate, setCate] = useState<string[]>(['ALL']);
  const [date, setDate] = useState<RangePickerValue>([moment().subtract(1, 'day'), moment()]);
  const [lang, setLang] = useState<string>('ALL');
  const [list, setList] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState('stars');
  const [asc, setAsc] = useState<Asc>(0);

  const fetchCate = (params: LangsClassParams) => {
    request<LangsClassParams>({ ...fetchLangsClass, params }).then(
      response => {
        setCate(['ALL'].concat(response.payload.langs));
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
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
    );
  };

  const handleRangeDate = ([startTime, endTime]: RangePickerValue) => {
    if (typeof startTime === 'undefined' || typeof endTime === 'undefined') {
      return [];
    }
    const dateSetFormat = { hour: 0, minute: 0, second: 0 };
    const startStamps: number = startTime.set(dateSetFormat).unix();
    const endStamps: number = endTime.set(dateSetFormat).unix();
    setDate([startTime, endTime]);
    return [startStamps, endStamps];
  };

  const handleChange = (value: string) => {
    setLang(value);
  };

  const onChange = (
    pagination: PaginationConfig,
    filters: Record<never, string[]>,
    sorter: SorterResult<object>,
  ) => {
    setOrder(sorter.field);
    setAsc(sorter.order === 'descend' ? 0 : 1);
    setPage(1);
  };

  useEffect(() => {
    const [startStamps, endStamps] = handleRangeDate(date);
    fetchCate({ start_time: startStamps, end_time: endStamps });
  }, []);

  useEffect(() => {
    const [startStamps, endStamps] = handleRangeDate(date);
    fetchList({
      start_time: startStamps,
      end_time: endStamps,
      lang: lang === 'ALL' ? '' : lang,
      page,
      order,
      asc,
    });
  }, [page, order, asc]);

  const init = () => {
    const [startStamps, endStamps] = handleRangeDate(date);
    fetchCate({ start_time: startStamps, end_time: endStamps });
    fetchList({
      start_time: startStamps,
      end_time: endStamps,
      lang: lang === 'all' ? '' : lang,
      page,
      order,
      asc,
    });
  };

  return (
    <PageHeaderWrapper className={styles.summary}>
      <Card>
        <div className={styles.search}>
          <RangePicker
            showTime
            onChange={handleRangeDate}
            defaultValue={date}
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
          <Button type="primary" onClick={init}>
            搜索
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={list}
          onChange={onChange}
          loading={loading}
          rowKey="repo_id"
          pagination={{
            current: page,
            pageSize: 10,
          }}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default Summary;
