export type RoleItem = {
  id: string | number;
  name?: string;
  enable?: boolean;
  updateTime?: string;
  createTime?: string;
  remark?: string;
  menus?: any;
};

export type ResRoles = API.ResPagination<AdminItem>;

export type QsRoles = API.Qs;

export type AuthItem = {
  key?: string; // 权限 KEY
  title?: string; // 权限名称
  children?: AuthItem[];
};

export type ResAuth = AuthItem[];
