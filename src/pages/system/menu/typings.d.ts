export type MenuItem = {
  id?: string;
  pid?: string;
  name?: string;
  enable?: boolean;

  icon?: string;
  path?: string;
  menuType?: string;
  perms?: string;

  updateTime?: string;
  createTime?: string;
};

export type ResMenu = MenuItem[];
