import { useState } from 'react';
import store from 'store2';

// TODO: add expire
// import 'store2/src/store.cache.js'

export default store;

export const getToken = () => store.get('token');

/** get token */
export function useToken(init?: string) {
  const TOKEN = 'token';

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
  const TOKEN = 'userinfo';
  const [data, setData] = useState<UserInfo>(store.get(TOKEN));
  const set = (data: any) => store(TOKEN, data || init);
  const refresh = () => setData(store.get(TOKEN));

  return { data, set, refresh };
}
