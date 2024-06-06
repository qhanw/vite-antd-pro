// import request from '@/utils/request';
// import { AxiosRequestConfig } from 'axios';

export type SignIn = {
  username: string;
  password: string;
  type?: 'account' | 'email' | 'phone';
};

// export type SignInRes = API.Res<string>

export type SignOUt = undefined;

// export async function signIn(data: SignIn, opts?: AxiosRequestConfig<SignIn>) {
//     return request<string>('/api/login', { method: 'post', data, ...opts })
// }

// export async function signOut() {
//   return request('/api/logout', { method: 'post' });
// }

export async function signIn(data: SignIn) {
  return Promise.resolve(`token-${data.username}`);
}

export async function signOut() {
  return Promise.resolve(true);
}
