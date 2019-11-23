import { IRoute } from 'umi-types';

const routes: IRoute[] = [
  {
    name: 'login',
    path: '/login',
    component: './user/login',
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './test/Welcome',
          },
          {
            component: './user/404',
          },
        ],
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
