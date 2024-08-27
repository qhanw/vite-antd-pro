export type AdminItem = {
  id?: string;
  roleId?: string;
  name?: string;
  enable?: boolean;
  updateTime?: string;
  createTime?: string;
};

export type ResAdmin = API.ResPagination<AdminItem>;

export type QsAdmin = API.Qs & { name?: string; role?: number };
