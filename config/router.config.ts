import { IRoute } from 'umi-types';

const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BasicLayout',
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
