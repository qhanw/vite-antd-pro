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

export async function fetchUserInfo() {
  return request<UserInfo>('/api/sys/admin/self');
}
