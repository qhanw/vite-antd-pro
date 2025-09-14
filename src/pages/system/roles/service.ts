import request from '@/utils/request';
import type { QsRoles, RoleItem, AuthItem } from './typings';

export async function fetchRoles(params?: QsRoles) {
  return request<RoleItem[]>('/api/admin/role', { params });
}

/** 新增编辑角色 */
export async function mutateRole(data: RoleItem) {
  const mode = data?.id ? 'edit' : 'add';
  return request(`/api/admin/role/${mode}`, { method: 'post', data });
}

/** 删除角色 */
export async function delRole(id: string | number) {
  return request<API.ResEnum>(`/api/admin/role/${id}`, { method: 'delete' });
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
export async function bindRoleAuth({ id, auths }: { id: string | number; auths: string[] }) {
  return request(`/api/sys/role/${id}/auth`, { method: 'post', data: { auths } });
}
