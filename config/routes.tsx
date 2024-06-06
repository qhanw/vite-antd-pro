import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Outlet, Navigate } from 'react-router-dom';
import base, { Route } from './base';
import { access } from './access';

const lazyLoad = (src: any) => (
  <Suspense fallback={<Spin spinning />}>{React.createElement(lazy(src))}</Suspense>
);

// 动态路由配置
const pages = import.meta.glob([
  '/src/{pages,layouts}/**/*.{ts,tsx,js,jsx}',
  '!**/{components,utils,services,auth}',
  '!**/{utils,util,service,services,auth}.{ts,tsx,js,jsx}',
  '!**/*.{d.ts,json}',
]);

const exception = {
  403: '/src/pages/exception/403',
  404: '/src/pages/exception/404',
  500: '/src/pages/exception/500',
  ErrorBoundary: '/src/pages/exception/ErrorBoundary',
};

const metaPages = Object.entries(pages).reduce(
  (prev, [key, val]) => ({
    ...prev,
    [key.replace(/(\/index)?\.tsx$/, '')]: val,
  }),
  {} as any,
);

/**
 * 根据配置文件解析路由
 * @param r 路由配置
 * @param allow 继承父级权限
 * @returns 路由配置
 */
const genRoutes = function f(r: Route[], allow?: string): any {
  return r.map(({ index, path, layout, element, children, redirect, access: acc }) => {
    // 如果不存在 layout 和 页面组件，表示当前路由层为无布局容器页
    const isEmptyContainer = !(layout || element);

    let page;
    if (!isEmptyContainer) {
      const replacer = `/src/${layout ? '' : 'pages/'}`;
      page = metaPages[(layout ?? element)!.replace('./', replacer)];
    }

    const elem = page ?? metaPages[exception[404]];

    return {
      loader: () => {
        // 鉴权权限
        const p = allow && access[allow]();
        const c = acc && access[acc]();
        const pass = p ?? c ?? true;

        if (!pass) throw new Response('Not Authorized', { status: 403 });
        return null;
      },
      errorElement: lazyLoad(metaPages[exception.ErrorBoundary]),
      element: isEmptyContainer ? <Outlet /> : lazyLoad(elem),
      ...(index ? { index } : { path }),
      ...(redirect ? { element: <Navigate to={redirect} replace /> } : {}),
      ...(children ? { children: f(children, acc) } : {}),
    };
  });
};

export const routes = genRoutes(base);
