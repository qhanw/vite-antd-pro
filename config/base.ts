export type Route = {
  path?: string;
  element?: string;
  name?: string;
  icon?: any;
  index?: boolean;
  layout?: string;
  access?: string;
  children?: Route[];
};

const routes: Route[] = [
  { path: '/login', element: './login' },
  {
    path: '/',
    layout: './layouts/BaseLayout',
    children: [
      {
        index: true,
        path: '/welcome',
        name: '欢迎',
        icon: 'i-menu:smile',
        element: './welcome',
      },
      {
        path: 'dashboard',
        element: './dashboard',
        name: 'dashboard',
        icon: 'i-menu:dashboard',
        children: [
          { path: 'd1', element: './dashboard/D1', name: 'D1' },
          { path: 'd2', element: './dashboard/D2', name: 'D2' },
        ],
      },
      {
        path: '/system',
        name: '系统管理',
        icon: 'i-menu:crow',
        children: [
          { path: '/system/admin', name: '管理员', element: './system/admin' },
          { path: 'roles', name: '角色管理', element: './system/roles' },
          { path: 'menu', name: '菜单管理', element: './system/menu' },
          { path: 'logs', name: '操作日志', element: './system/Logs' },
          { path: '*', element: './not-found' },
        ],
      },
      { path: '*', element: './not-found' },
    ],
  },

  { path: '*', element: './not-found' },
];

export default routes;
