import request from "@/utils/request";
import { AxiosRequestConfig } from 'axios'


export type SignIn = {
    username: string
    password: string
}

export type SignInRes = API.Res<string>

export type SignOUt = undefined


export async function signIn(data: SignIn, opts?: AxiosRequestConfig<SignIn>) {
    return request<SignInRes>('/api/login', { method: 'post', data, ...opts })

}

export async function signOut() {
    return request<API.Res<null>>('/api/logout', { method: 'post' })
}


