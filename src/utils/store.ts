import store from 'store2';

// TODO: add expire
// import 'store2/src/store.cache.js'

export default store;

const TOKEN = 'token';
const USERINFO = 'userinfo';
const AUTH_KEYS = 'auth_keys';

/** get and set token */
export const getToken = () => store(TOKEN);
export const setToken = (data: string) => store(TOKEN, data);

type UserInfo = {
  id: string;
  roleId: string;
  name: string;
  enable: boolean;
};
/** get and set userinfo */
export const getUserInfo = () => store(USERINFO);
export const setUserInfo = (data: UserInfo) => store(USERINFO, data);

/** get and set auth keys */
export const getAuthKeys = () => store(AUTH_KEYS);
export const setAuthKeys = (data: string[]) => store(AUTH_KEYS, data);
