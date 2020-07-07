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
        path: '/daily',
        name: '日常汇总',
        icon: 'area-chart',
        component: './daily/Summary',
      },
      {
        path: '/detail',
        name: '详情数据',
        icon: 'area-chart',
        component: './detail',
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
