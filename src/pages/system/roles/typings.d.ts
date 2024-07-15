export type RoleItem = {
  id?: string;
  pid?: string;
  name?: string;
  remark?: string;
};

export type ResRoles = API.ResPagination<AdminItem>;

export type QsRoles = API.Qs;

export type AuthItem = {
  key?: string; // 权限 KEY
  title?: string; // 权限名称
  children?: AuthItem[];
};

export type ResAuth = AuthItem[];
