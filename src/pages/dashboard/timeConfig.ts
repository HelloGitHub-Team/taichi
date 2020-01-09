import moment from 'moment';

interface IDayItem {
  text: string;
  date: moment.Moment;
}
interface IDateTextMap {
  today: IDayItem;
  yesterday: IDayItem;
  nearlySevenDay: IDayItem;
  nearlyOneMonth: IDayItem;
}
export const DATE_TEXT_MAP: IDateTextMap = {
  today: {
    text: '今天',
    date: moment(),
  },
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
