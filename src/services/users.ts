import request from "@/utils/request";

export type UserInfo = API.Res<{
    id: string
    role_id: string
    username: string
    is_disable: boolean
    passwd: string
    update_time: string
    create_time: string
}>

export async function fetchUserInfo() {
    return request<UserInfo>('/api/sys/admin/self')
}

