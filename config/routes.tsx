import React, { Suspense, lazy } from "react";
import { Spin } from "antd";
import { CrownFilled, SmileFilled, TabletFilled } from "@ant-design/icons";

const lazyLoad = (src: any) => (
  <Suspense fallback={<Spin spinning />}>
    {React.createElement(lazy(src))}
  </Suspense>
);

const base = [
  { path: "/login", component: "./login" },
  {
    path: "/",
    layout: "./layouts/BaseLayout",
    routes: [
      {
        index: true,
        path: "/welcome",
        name: "欢迎",
        icon: <SmileFilled />,
        component: "./welcome",
      },
      {
        path: "dashboard",
        component: "./dashboard",
        name: "dashboard",
        icon: <SmileFilled />,
        routes: [
          {
            path: "d1",
            component: "./dashboard/D1",
            name: "D1",
            icon: <SmileFilled />,
          },
          {
            path: "d2",
            component: "./dashboard/D2",
            name: "D2",
            icon: <SmileFilled />,
          },
        ],
      },

      {
        path: "/admin",
        name: "管理页",
        icon: <CrownFilled />,
        access: "canAdmin",
        component: "./Admin",
        routes: [
          {
            path: "/admin/sub-page1",
            name: "一级页面",
            icon: CrownFilled,
            component: "./Welcome",
          },
          {
            path: "/admin/sub-page2",
            name: "二级页面",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
          {
            path: "/admin/sub-page3",
            name: "三级页面",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
        ],
      },
      {
        name: "列表页",
        icon: <TabletFilled />,
        path: "/list",
        component: "./ListTableList",
        routes: [
          {
            path: "/list/sub-page",
            name: "列表页面",
            icon: <CrownFilled />,
            routes: [
              {
                path: "sub-sub-page1",
                name: "一一级列表页面",
                icon: <CrownFilled />,
                component: "./Welcome",
              },
              {
                path: "sub-sub-page2",
                name: "一二级列表页面",
                icon: <CrownFilled />,
                component: "./Welcome",
              },
              {
                path: "sub-sub-page3",
                name: "一三级列表页面",
                icon: <CrownFilled />,
                component: "./Welcome",
              },
              { path: "*", element: "./not-found" },
            ],
          },
          {
            path: "/list/sub-page2",
            name: "二级列表页面",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
          {
            path: "/list/sub-page3",
            name: "三级列表页面",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
          { path: "*", element: "./not-found" },
        ],
      },
      { path: "*", component: "./not-found" },
    ],
  },

  { path: "*", component: "./not-found" },
];

// 动态路由配置
const pages = import.meta.glob("/src/{pages,layouts}/**/*");
const dynamicImport = Object.entries(pages).reduce(
  (prev, [key, val]) => ({
    ...prev,
    [key.replace(/(\/index)?\.tsx$/, "")]: val,
  }),
  {} as any
);

const genRoutes = function f(r: any): any {
  return r.map(({ index, path, layout, component, routes }: any) => {
    const replacer = `/src/${layout ? "" : "pages/"}`;
    const page = dynamicImport[(layout ?? component)?.replace("./", replacer)];

    return {
      ...(index ? { index } : { path }),
      element: lazyLoad(page ?? dynamicImport["/src/pages/not-found"]),

      ...(routes ? { children: f(routes) } : {}),
    };
  });
};

const genMenus = function f(r: any): any {
  return r.reduce((prev: any, curr: any) => {
    if (curr.routes) f(curr.routes);

    if (curr.index) curr.path = "/";

    if (curr.path !== "*") prev.push(curr);

    return prev;
  }, []);
};

export const routes = genRoutes(base);

export const menus = genMenus(base.filter((node: any) => node.path === "/")).at(
  -1
);

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
