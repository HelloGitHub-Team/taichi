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
        name: '分析',
        icon: 'smile',
        component: './dashboard/Analysis',
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
