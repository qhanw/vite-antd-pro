import request from '@/utils/request';
import type { ResRoles, QsRoles, RoleItem, AuthItem } from './typings';

export async function fetchSysRoles(params?: QsRoles) {
  return request<ResRoles>('/api/sys/role/list', { params });
}

/** 新增编辑角色 */
export async function mutateRole(data: RoleItem) {
  return request('/api/sys/role/mutate', { method: 'post', data });
}

/** 删除角色 */
export async function delRole(id: string | number) {
  return request<API.ResEnum>(`/api/sys/role/${id}`, { method: 'delete' });
}

// 分配权限

/** 获取全量权限 */
export async function queryAllAuthList() {
  return request<AuthItem[]>('/api/sys/menu/enum');
}

/** 获取角色权限*/
export async function queryRoleAuthList(id: string | number) {
  return request<string[]>(`/api/sys/role/${id}/auth`);
}

/** 绑定角色权限*/
export async function bindRoleAuth(id: string | number, data: string[]) {
  return request(`/api/sys/role/${id}/auth`, { method: 'post', data: { auths: data } });
}
