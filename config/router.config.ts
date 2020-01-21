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
        path: '/detail/:type',
        name: '统计详情',
        component: './dashboard/Detail',
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
