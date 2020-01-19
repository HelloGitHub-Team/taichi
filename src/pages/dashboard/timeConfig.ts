import moment from 'moment';

interface IDayItem {
  text: string;
  date: moment.Moment;
}

export type DayKey = 'yesterday' | 'nearlySevenDay' | 'nearlyOneMonth';
type IDateTextMap = {
  [key in DayKey]: IDayItem;
};
export const DATE_TEXT_MAP: IDateTextMap = {
  yesterday: {
    text: '昨天',
    date: moment().subtract(1, 'day'),
  },
  nearlySevenDay: {
    text: '近7天',
    date: moment().subtract(7, 'day'),
  },
  nearlyOneMonth: {
    text: '近一个月',
    date: moment().subtract(1, 'months'),
  },
};
