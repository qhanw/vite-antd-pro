import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import base, { Route } from './base';
import { Outlet } from 'react-router-dom';

const lazyLoad = (src: any) => (
  <Suspense fallback={<Spin spinning />}>{React.createElement(lazy(src))}</Suspense>
);

// 动态路由配置
const pages = import.meta.glob('/src/{pages,layouts}/**/*.{ts,tsx,js.jsx}');
const dynamicImport = Object.entries(pages).reduce(
  (prev, [key, val]) => ({
    ...prev,
    [key.replace(/(\/index)?\.tsx$/, '')]: val,
  }),
  {} as any,
);

const genRoutes = function f(r: Route[]): any {
  return r.map(({ index, path, layout, component, routes }) => {
    // 如果不存在 layout 和 页面组件，表示当前路由层为无布局容器页
    const isEmptyContainer = !(layout || component);

    let page;
    if (!isEmptyContainer) {
      const replacer = `/src/${layout ? '' : 'pages/'}`;
      page = dynamicImport[(layout ?? component)!.replace('./', replacer)];
    }

    return {
      ...(index ? { index } : { path }),
      element: isEmptyContainer ? (
        <Outlet />
      ) : (
        lazyLoad(page ?? dynamicImport['/src/pages/not-found'])
      ),

      ...(routes ? { children: f(routes) } : {}),
    };
  });
};

const genMenus = function f(r: Route[], parent?: Route) {
  return r.reduce((prev, curr) => {
    if (curr.routes) f(curr.routes, curr);

    if (curr.index) curr.path = parent?.path || '/';

    if (curr.path !== '*') prev.push(curr);

    return prev;
  }, [] as Route[]);
};

export const routes = genRoutes(base);

export const menus = genMenus(base.filter((node) => node.path === '/')).at(-1);

// export const routes = [
//   {
//     path: "login",
//     element: lazyLoad(() => import("../src/pages/login")),
//   },
//   {
//     path: "/",
//     element: <BasicLayout />, // BasicLayout是基本布局，不必使用懒加载
//     children: [
//       {
//         index: true,
//         element: lazyLoad(() => import("../src/pages/welcome")),
//       },
//       {
//         path: "dashboard",
//         element: lazyLoad(() => import("../src/pages/dashboard")),
//         children: [
//           {
//             path: "d1",
//             element: lazyLoad(() => import("../src/pages/dashboard/D1")),
//           },
//           {
//             path: "d2",
//             element: lazyLoad(() => import("../src/pages/dashboard/D2")),
//           },
//         ],
//       },

//       {
//         path: "*",
//         element: lazyLoad(() => import("../src/pages/not-found")),
//       },
//     ],
//   },
// ];
