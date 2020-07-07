import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, DatePicker, Icon, message } from 'antd';
import cls from 'classnames';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import moment from 'moment';
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
}

interface totalObj {
  num: number | undefined;
  name: string;
}

const Statistics = () => {
  const history = useHistory();
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
      },
      {
        key: 'click',
        options: processRepoViewOptions(repoView),
        total: [
          { num: repoView?.all_count, name: '总点击数' },
          { num: repoView?.all_ip_count, name: '总IP数' },
        ],
        title: '推荐项目点击数据',
      },
      {
        key: 'period',
        options: processVolumeView(volumeView),
        total: [
          { num: volumeView?.all_count, name: '总点击数' },
          { num: volumeView?.all_ip_count, name: '总IP数' },
        ],
        title: `第 ${volumeView?.volume_name || '-'} 期月刊数据`,
      },
      {
        key: 'notice',
        options: processNoticeViewOptions(noticeView),
        total: [
          { num: noticeView?.all_count, name: '总点击数' },
          { num: noticeView?.all_ip_count, name: '总IP数' },
        ],
        title: '公告栏点击数',
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
    chartTypeMap.forEach(type => fetchDataFun(type.key, params));
    Promise.all(requestPromiseArr)
      .then(res => {
        if (res && res.length > 0) {
          res.forEach((data: any, index: number) => {
            chartTypeMap[index].fun(data.payload.view_data);
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
    const timeArray = [];
    const [startStamps, endStamps] = handleRangeDate(date);
    fetchHomeData({ start_time: startStamps, end_time: endStamps });
    timeArray[0] = startStamps;
    timeArray[1] = endStamps;
    window.localStorage.setItem('selectedTime', JSON.stringify(timeArray));
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
    const timeArray = [];
    if (startStamps === endStamps) {
      message.warning('请选择一个范围');
      return;
    }
    setActiveDateText('');
    setDate([startTime, endTime] as RangePickerValue);
    timeArray[0] = startTime;
    timeArray[1] = endTime;
    fetchHomeData({ start_time: startStamps, end_time: endStamps });
    window.localStorage.setItem('selectedTime', JSON.stringify(timeArray));
  };

  const handleGoUrl = (item: IOptionsWithKey) => {
    const key = item.key || '';
    switch (key) {
      case 'click':
        history.push('/detail');
        break;
      default:
    }
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
    <div className={styles.detail}>
      <span onClick={() => handleGoUrl(item)}>详情</span>{' '}
      <Icon className={styles.right} type="right" />
    </div>
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
