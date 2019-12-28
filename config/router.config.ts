import { IRoute } from 'umi-types';

const routes: IRoute[] = [
  {
    name: 'login',
    path: '/login',
    component: './user/login',
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    authority: ['user'],
    routes: [
      {
        path: '/',
        name: '统计',
        icon: 'area-chart',
        component: './dashboard/Statistics',
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
