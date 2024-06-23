// import request from '@/utils/request';
import { getToken } from '@/utils/store';
export type UserInfo = {
  id: string;
  name: string;
  roleId: string;
  enable: boolean;
  password: string;
  updateTime: string;
  createTime: string;
};

function sleep(ms: number, bool?: boolean) {
  return new Promise((resolve, reject) => setTimeout(bool ? resolve : reject, ms));
}

/** 获取用户信息 */
export async function queryUserInfo() {
  // return request<UserInfo>('/api/sys/admin/self');

  const token = getToken();
  const name = token.replace('token-', '');

  return sleep(2000, true).then(() => ({
    id: 1,
    name: name,
    password: 'e10adc3949ba59abbe56e057f20f883e',
    roleId: name,
  }));
}

/** 获取用户授权 */
export async function queryUserAuth() {
  // return request<string[]>('/api/sys/admin/auth');

  return Promise.resolve([
    'WELCOME',
    'DASHBOARD',
    'DASHBOARD:GMAP',
    'DASHBOARD:D1',
    'DASHBOARD:D2',
    'OPER_TOOLS',
    'OPER_TOOLS:USER_SEARCH',
    'user-button',
    'user-button',
    'OPER_TOOLS:ADS',
    'OPER_TOOLS:IDENTITY',
    'SYSTEM',
    'SYSTEM:ADMIN',
    'SYSTEM:ROLES',
    'SYSTEM:MENU',
    'SYSTEM:LOGS',
  ]);
}
