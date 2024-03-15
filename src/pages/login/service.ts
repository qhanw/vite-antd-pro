import request from "@/utils/request";

import { AxiosRequestConfig } from 'axios'



import { SignIn, SignInRes, UserInfo } from './typings'

export function login(data: SignIn, opts?: AxiosRequestConfig<SignIn>) {
    return request<SignInRes>('/api/login', { method: 'post', data, ...opts })

}

export function fetchUserInfo() {
    return request<UserInfo>('/api/sys/admin/self')
}

