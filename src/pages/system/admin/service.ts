import request from '@/utils/request';
import type { ResAdmin, QsAdmin, AdminItem } from './typings';

export async function fetchSysAdmin(params?: QsAdmin) {
  return request<ResAdmin>('/api/sys/admin/page', { params });
}

export async function fetchRolesEnum() {
  return request<API.ResEnum>('/api/sys/role/enum');
}

/** 新增编辑管理员 */
export async function mutateAdmin(data: AdminItem) {
  return request<API.ResEnum>('/api/sys/admin/mutate', {
    method: 'post',
    data,
  });
}

/** 删除管理员 */
export async function delAdmin(id: string | number) {
  return request<API.ResEnum>(`/api/sys/admin/${id}`, {
    method: 'delete',
  });
}
