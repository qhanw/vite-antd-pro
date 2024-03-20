import { CrownFilled, SmileFilled } from "@ant-design/icons";

export type Route = {
  path?: string;
  component?: string;
  name?: string;
  icon?: any;
  index?: boolean;
  layout?: string;
  access?: string;
  routes?: Route[];
};

const routes: Route[] = [
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
        path: "/system",
        name: "系统管理",
        icon: <CrownFilled />,
        routes: [
          {
            path: "/system/admin",
            name: "管理员",
            icon: <CrownFilled />,
            component: "./system/admin",
          },
          {
            path: "roles",
            name: "角色管理",
            icon: <CrownFilled />,
            component: "./system/roles",
          },
          {
            path: "menus",
            name: "菜单管理",
            icon: <CrownFilled />,
            component: "./system/menus",
          },
          {
            path: "logs",
            name: "操作日志",
            icon: <CrownFilled />,
            component: "./system/Logs",
          },
          { path: "*", component: "./not-found" },
        ],
      },
      { path: "*", component: "./not-found" },
    ],
  },

  { path: "*", component: "./not-found" },
];

export default routes;
