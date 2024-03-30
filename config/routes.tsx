import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import base, { Route } from './base';
import { Outlet } from 'react-router-dom';

const lazyLoad = (src: any) => (
  <Suspense fallback={<Spin spinning />}>{React.createElement(lazy(src))}</Suspense>
);

// 动态路由配置
const pages = import.meta.glob([
  '/src/{pages,layouts}/**/*.{ts,tsx,js,jsx}',
  '!**/{components,utils,services,auths}',
  '!**/{utils,util,service,services,auth}.{ts,tsx,js,jsx}',
  '!**/*.d.ts',
]);

const dynamicImport = Object.entries(pages).reduce(
  (prev, [key, val]) => ({
    ...prev,
    [key.replace(/(\/index)?\.tsx$/, '')]: val,
  }),
  {} as any,
);

const genRoutes = function f(r: Route[]): any {
  return r.map(({ index, path, layout, element, children }) => {
    // 如果不存在 layout 和 页面组件，表示当前路由层为无布局容器页
    const isEmptyContainer = !(layout || element);

    let page;
    if (!isEmptyContainer) {
      const replacer = `/src/${layout ? '' : 'pages/'}`;
      page = dynamicImport[(layout ?? element)!.replace('./', replacer)];
    }

    return {
      ...(index ? { index } : { path }),
      element: isEmptyContainer ? (
        <Outlet />
      ) : (
        lazyLoad(page ?? dynamicImport['/src/pages/not-found'])
      ),

      ...(children ? { children: f(children) } : {}),
    };
  });
};

const genMenus = function f(r: Route[], parent?: Route) {
  return r.reduce((prev, curr) => {
    const { index, children, icon, path } = curr;

    if (children) f(children, curr);

    if (index) curr.path = parent?.path || '/';

    if (icon && typeof icon === 'string') {
      curr.icon = <span className={`anticon ${icon}`} />;
    }

    if (path !== '*') prev.push(curr);

    return prev;
  }, [] as Route[]);
};

export const routes = genRoutes(base);

export const menus = genMenus(base.filter((node) => node.path === '/')).at(-1);
