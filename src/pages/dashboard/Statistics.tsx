import React, { Fragment, useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, DatePicker } from 'antd';
import cls from 'classnames';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import moment from 'moment';
import styles from './Statistics.less';
import ChartWrapper from '@/components/ChartWrapper/ChartWrapper';
import {
  FromView,
  processFromViewOptions,
  processRepoViewOptions,
  processVolumeView,
  RepoView,
  RootObject,
  VolumeView,
} from '@/pages/dashboard/echartsOptions';
import { fetchHomeView, IHomeViewParams } from '@/services/Statistics';
import request from '@/http/axiosRequest';
import { DATE_TEXT_MAP } from '@/pages/dashboard/timeConfig';

const { RangePicker } = DatePicker;
const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [fromView, setFromView] = useState<FromView | {}>({});
  const [repoView, setRepoView] = useState<RepoView | {}>({});
  const [volumeView, setVolumeView] = useState<VolumeView | {}>({});
  const [date, setDate] = useState<RangePickerValue>([moment().subtract(1, 'day'), moment()]);
  const [activeDateText, setActiveDateText] = useState('yesterday');
  const fetchHomeData = (params: IHomeViewParams) => {
    setLoading(true);
    request<IHomeViewParams, RootObject>({ ...fetchHomeView, params }).then(
      response => {
        setLoading(false);
        setFromView(response.payload.from_view);
        setRepoView(response.payload.repo_view);
        setVolumeView(response.payload.volume_view);
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
    const startStamps = startTime.set({ hour: 0, minute: 0 }).unix();
    const endStamps = endTime.set({ hour: 23, minute: 59 }).unix();
    return [startStamps, endStamps];
  };
  useEffect(() => {
    const [startStamps, endStamps] = handleRangeDate(date);
    fetchHomeData({ start_time: startStamps, end_time: endStamps });
  }, []);
  const onClickDateText = (key: string) => {
    setActiveDateText(key);
    const currentDate = [DATE_TEXT_MAP[key].date, moment()];
    const [startStamps, endStamps] = handleRangeDate(currentDate);
    setDate(currentDate);
    fetchHomeData({
      start_time: startStamps,
      end_time: endStamps,
    });
  };

  const onChangeDate = ([startTime, endTime]: RangePickerValue) => {
    const [startStamps, endStamps] = handleRangeDate([startTime, endTime] as RangePickerValue);
    setActiveDateText('');
    setDate([startTime, endTime] as RangePickerValue);
    fetchHomeData({ start_time: startStamps, end_time: endStamps });
  };
  const mainSearch = (
    <Fragment>
      <div className={styles.searchTextWrapper}>
        {Object.keys(DATE_TEXT_MAP).map(key => (
          <a
            className={cls(styles.searchText, { [styles.active]: activeDateText === key })}
            onClick={() => onClickDateText(key)}
            key={key}
          >
            {DATE_TEXT_MAP[key].text}
          </a>
        ))}
      </div>
      <RangePicker value={date} className={styles.rangeDatePicker} onChange={onChangeDate} />
    </Fragment>
  );
  return (
    <PageHeaderWrapper className={styles.statistics} content={mainSearch}>
      <Card className={styles.card} bordered={false}>
        <ChartWrapper loading={loading} height="400px" options={processFromViewOptions(fromView)} />
      </Card>
      <Card className={styles.card} bordered={false}>
        <ChartWrapper loading={loading} height="400px" options={processRepoViewOptions(repoView)} />
      </Card>
      <Card className={styles.card} bordered={false}>
        <ChartWrapper loading={loading} height="400px" options={processVolumeView(volumeView)} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default Statistics;
