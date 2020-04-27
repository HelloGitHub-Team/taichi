import { IRoute } from 'umi-types';

const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/statistics',
      },
      {
        path: '/statistics',
        name: '统计',
        icon: 'area-chart',
        component: './dashboard/Statistics',
      },
      {
        path: '/detail/from',
        name: '统计来源详情',
        component: './dashboard/FromDetail',
        hideInMenu: true,
      },
      {
        path: '/detail/click',
        name: '统计来源详情',
        component: './dashboard/ClickDetail',
        hideInMenu: true,
      },
      {
        path: '/detail/period',
        name: '统计来源详情',
        component: './dashboard/PeriodDetail',
        hideInMenu: true,
      },
      {
        component: './user/404',
      },
    ],
  },
  {
    component: './user/404',
  },
];
export default routes;
