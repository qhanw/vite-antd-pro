import request from '@/utils/request';
import type { ResMenu, MenuItem } from './typings';

export async function fetchSysMenu() {
  return request<ResMenu>('/api/sys/menu');
}

/** 新增编辑菜单 */
export async function mutateMenu(data: MenuItem) {
  return request('/api/sys/menu/mutate', { method: 'post', data });
}

/** 删除菜单 */
export async function delMenu(id: string | number) {
  return request<API.ResEnum>(`/api/sys/menu/${id}`, { method: 'delete' });
}
