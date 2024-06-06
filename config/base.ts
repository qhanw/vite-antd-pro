// explain: https://unocss.dev/guide/extracting#extracting-from-build-tools-pipeline
// @unocss-include

export type Route = {
  path?: string;
  element?: string;
  name?: string;
  icon?: React.ReactNode;
  index?: boolean;
  layout?: string;
  access?: string;
  children?: Route[];
  redirect?: string;
  hideInMenu?: boolean;
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
        name: 'Welcome',
        icon: 'i-menu:smile',
        element: './welcome',
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'i-menu:dashboard',

        children: [
          { path: '/dashboard', redirect: '/dashboard/page-1' },
          {
            path: '/dashboard/page-1',
            name: 'Page 1',
            element: './dashboard/page-1',
            access: 'canAccess',
          },
          { path: 'page-2', name: 'Page 2', element: './dashboard/page-2', access: 'canAccess' },
          { path: 'page-3', name: 'Page 3', element: './dashboard/page-3' },
          { path: '*', element: './exception/404' },
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
          { path: '*', element: './exception/404' },
        ],
      },

      { path: '*', element: './exception/404' },
    ],
  },

  { path: '*', element: './exception/404' },
];

export default routes;
