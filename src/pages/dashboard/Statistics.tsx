import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, DatePicker, Icon, message } from 'antd';
import cls from 'classnames';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import moment from 'moment';
import { Link } from 'umi';
import styles from './Statistics.less';
import ChartWrapper from '@/components/ChartWrapper/ChartWrapper';
import {
  FromView,
  IEchartsOption,
  processFromViewOptions,
  processRepoViewOptions,
  processVolumeView,
  processNoticeViewOptions,
  RepoView,
  RootObject,
  VolumeView,
} from '@/pages/dashboard/echartsOptions';
import { fetchHomeView, IHomeViewParams, ChartFunctionMap } from '@/services/statistics';
import request from '@/http/axiosRequest';
import { DATE_TEXT_MAP, DayKey } from '@/pages/dashboard/timeConfig';
// import { toUpper } from 'lodash';

const { RangePicker } = DatePicker;

interface IOptionsWithKey {
  key: string;
  options: IEchartsOption;
  total: totalObj[];
  title: string;
  loading: boolean;
}

interface totalObj {
  num: number;
  name: string;
}

const Statistics = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [fromView, setFromView] = useState<FromView | null>(null);
  const [repoView, setClickView] = useState<RepoView | null>(null);
  const [volumeView, setVolumeView] = useState<VolumeView | null>(null);
  const [noticeView, setNoticeView] = useState<RepoView | null>(null);
  const [date, setDate] = useState<RangePickerValue>([moment().subtract(1, 'day'), moment()]);
  const [activeDateText, setActiveDateText] = useState<DayKey | ''>('yesterday');
  const optionsList: IOptionsWithKey[] = useMemo(
    () => [
      {
        key: 'from',
        options: processFromViewOptions(fromView),
        total: [{ num: fromView?.all_count, name: '总来源数' }],
        title: '统计来源',
        loading: true,
      },
      {
        key: 'click',
        options: processRepoViewOptions(repoView),
        total: [
          { num: repoView?.all_count, name: '总点击数' },
          { num: repoView?.all_ip_count, name: '总IP数' },
        ],
        title: '推荐项目点击数据',
        loading: true,
      },
      {
        key: 'period',
        options: processVolumeView(volumeView),
        total: [
          { num: volumeView?.all_count, name: '总点击数' },
          { num: volumeView?.all_ip_count, name: '总IP数' },
        ],
        title: `第 ${volumeView?.volume_name || '-'} 期月刊数据`,
        loading: true,
      },
      {
        key: 'notice',
        options: processNoticeViewOptions(noticeView),
        total: [
          { num: noticeView?.all_count, name: '总点击数' },
          { num: noticeView?.all_ip_count, name: '总IP数' },
        ],
        title: '公告栏点击数',
        loading: true,
      },
    ],
    [fromView, repoView, volumeView, noticeView],
  );

  const requestPromiseArr: any = [];
  const chartTypeMap: ChartFunctionMap[] = [
    {
      key: 'from',
      fun: setFromView,
    },
    {
      key: 'click',
      fun: setClickView,
    },
    {
      key: 'volume',
      fun: setVolumeView,
    },
    {
      key: 'notice',
      fun: setNoticeView,
    },
  ];
  const fetchDataFun = (type: string, params: IHomeViewParams) => {
    // 防止直接对 prarms 做操作，接口请求的都是最后一个“notice”的 event,闭包？
    const newParams: IHomeViewParams = { ...params };
    newParams.event = type;
    const p = request<IHomeViewParams, RootObject>({ ...fetchHomeView, params: newParams });
    requestPromiseArr.push(p);
  };
  const fetchHomeData = (params: IHomeViewParams) => {
    setLoading(true);
    // 同时跑n个图表的接口
    // const chartType: string[] = ['from', 'click', 'volume', 'notice'];
    // for (const type of chartTypeMap) {
    chartTypeMap.forEach(type => fetchDataFun(type.key, params));
    // fetchDataFun(type.key, params);
    // }
    Promise.all(requestPromiseArr)
      .then(res => {
        if (res && res.length > 0) {
          res.forEach((data: any, index: number) => {
            chartTypeMap[index].fun(data.payload.view_data);
            // const nameArr = chartType[index].split('')
            // nameArr[0] = toUpper(nameArr[0])

            // const funName: any = `set${nameArr.join('')}View`
            // // 不要滥用 不要滥用 不要滥用eval
            // eval(funName)(data.payload.view_data);
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
    // request<IHomeViewParams, RootObject>({ ...fetchHomeView, params }).then(
    //   response => {
    //     setLoading(false);
    //     setFromView(response.payload.from_view);
    //     setRepoView(response.payload.repo_view);
    //     setVolumeView(response.payload.volume_view);
    //   },
    //   () => {
    //     setLoading(false);
    //   },
    // );
  };
  const handleRangeDate = ([startTime, endTime]: RangePickerValue) => {
    if (typeof startTime === 'undefined' || typeof endTime === 'undefined') {
      return [];
    }
    const dateSetFormat = { hour: 0, minute: 0, second: 0 };
    const startStamps = startTime.set(dateSetFormat).unix();
    const endStamps = endTime.set(dateSetFormat).unix();
    return [startStamps, endStamps];
  };
  useEffect(() => {
    const [startStamps, endStamps] = handleRangeDate(date);
    fetchHomeData({ start_time: startStamps, end_time: endStamps });
  }, []);
  const onClickDateText = (key: DayKey) => {
    setActiveDateText(key);
    const currentDate: [moment.Moment, moment.Moment] = [DATE_TEXT_MAP[key].date, moment()];
    const [startStamps, endStamps] = handleRangeDate(currentDate);
    setDate(currentDate);
    fetchHomeData({
      start_time: startStamps,
      end_time: endStamps,
    });
  };

  const onChangeDate = ([startTime, endTime]: RangePickerValue) => {
    const [startStamps, endStamps] = handleRangeDate([startTime, endTime] as RangePickerValue);
    if (startStamps === endStamps) {
      message.warning('请选择一个范围');
      return;
    }
    setActiveDateText('');
    setDate([startTime, endTime] as RangePickerValue);
    fetchHomeData({ start_time: startStamps, end_time: endStamps });
  };
  const mainSearch = (
    <Fragment>
      <div className={styles.searchTextWrapper}>
        {/* FIXME:如何优化这里key的类型，而不用使用类型断言 */}
        {Object.keys(DATE_TEXT_MAP).map(key => (
          <a
            className={cls(styles.searchText, { [styles.active]: activeDateText === key })}
            onClick={() => onClickDateText(key as DayKey)}
            key={key}
          >
            {DATE_TEXT_MAP[key as DayKey].text}
          </a>
        ))}
      </div>
      <RangePicker value={date} className={styles.rangeDatePicker} onChange={onChangeDate} />
    </Fragment>
  );
  const extra = (item: IOptionsWithKey) => (
    <Link className={styles.detail} to={`/detail/${item.key}`}>
      <span>详情</span> <Icon className={styles.right} type="right" />
    </Link>
  );
  return (
    <PageHeaderWrapper className={styles.statistics} content={mainSearch}>
      {optionsList.map(item => (
        <Card
          title={item.title}
          extra={extra(item)}
          className={styles.card}
          bordered={false}
          key={item.key}
        >
          <ChartWrapper loading={loading} height="400px" options={item.options} />
          <div className={styles.totalSum}>
            {item.total.map((sum: any) => (
              <div key={sum.name}>
                <div className={styles.totalNum}>{sum.num}</div>
                <div className={styles.numName}>{sum.name}</div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </PageHeaderWrapper>
  );
};

export default Statistics;
