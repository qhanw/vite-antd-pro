import { useState } from 'react';
import store from 'store2';

// TODO: add expire
// import 'store2/src/store.cache.js'

export default store;

const TOKEN = 'token';
const USERINFO = 'userinfo';
const AUTH_KEYS = 'auth_keys';

export const getToken = () => store.get(TOKEN);
export const getUserInfo = () => store.get(USERINFO);
export const getAuthKeys = () => store.get(AUTH_KEYS);

/** get token */
export function useToken(init?: string) {
  const [data, setData] = useState<string>(store.get(TOKEN));
  const set = (data: string) => store(TOKEN, data || init);
  const refresh = () => setData(store.get(TOKEN));

  return { data, set, refresh };
}

type UserInfo = {
  id: string;
  roleId?: string;
  name: string;
  enable: boolean;
};
/** get userinfo */
export function useUserInfo(init?: any) {
  const [data, setData] = useState<UserInfo>(store.get(USERINFO));
  const set = (data: any) => store(USERINFO, data || init);
  const refresh = () => setData(store.get(USERINFO));

  return { data, set, refresh };
}

/** get auth keys */
export function useAuthKeys(init?: string[]) {
  const [data, setData] = useState<string[]>(store.get(AUTH_KEYS));
  const set = (data?: string[]) => store(AUTH_KEYS, data || init);
  const refresh = () => setData(store.get(AUTH_KEYS));

  return { data, set, refresh };
}
