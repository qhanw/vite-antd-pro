import type { Route } from './base';

import { getUserInfo } from '@/utils/store';

type AuthProvider = {
  canAccess: (route?: Route) => void;
  [propName: string]: any;
};

export const access: AuthProvider = {
  canAccess: () => getUserInfo()?.roleId === 'root',
};
