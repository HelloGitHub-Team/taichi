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
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './test/Welcome',
      },
      {
        path: '/exampleTable',
        name: 'exampleTable',
        icon: 'smile',
        component: './test/ExampleTable',
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
