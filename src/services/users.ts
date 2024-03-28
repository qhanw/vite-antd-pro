import request from '@/utils/request';

export type UserInfo = {
  id: string;
  name: string;
  roleId: string;
  enable: boolean;
  password: string;
  updateTime: string;
  createTime: string;
};

/** 获取用户信息 */
export async function queryUserInfo() {
  return request<UserInfo>('/api/sys/admin/self');
}

/** 获取用户授权 */
export async function queryUserAuth() {
  return request<string[]>('/api/sys/admin/auth');
}
