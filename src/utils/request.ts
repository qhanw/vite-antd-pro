import axios from 'axios';
import { AxiosRequestConfig } from 'axios'
// import { notification } from 'antd';
import store from '@/utils/store';



const instance = axios.create({
    timeout: 1000,
});

// const CODE_MESSAGE = {
//     200: '服务器成功返回请求的数据。',
//     201: '新建或修改数据成功。',
//     202: '一个请求已经进入后台排队（异步任务）。',
//     204: '删除数据成功。',
//     400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//     401: '用户没有权限（令牌、用户名、密码错误）。',
//     403: '用户得到授权，但是访问是被禁止的。',
//     404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//     406: '请求的格式不可得。',
//     410: '请求的资源被永久删除，且不会再得到的。',
//     422: '当创建一个对象时，发生一个验证错误。',
//     500: '服务器发生错误，请检查服务器。',
//     502: '网关错误。',
//     503: '服务不可用，服务器暂时过载或维护。',
//     504: '网关超时。',
// };

// const notice =
//     (response: any, errorText: string) =>
//         notification.error({
//             // message: `请求错误 ${response.status}: ${response.url}`,
//             message: `请求错误 ${response.status}:`,
//             description: errorText,
//         })

// /**
//  * 异常处理程序
//  */
// const errorHandler = (error: { response: Response }): void => {
//     const { response } = error;
//     if (response && response.status) {
//         const errorText = codeMessage[response.status] || response.statusText;
//         const { status, url } = response;

//         // notification.error({
//         //   message: `请求错误 ${status}: ${url}`,
//         //   description: errorText,
//         // });

//         notice(response, errorText);

//         if (status === 401) {
//             // @HACK
//             /* eslint-disable no-underscore-dangle */
//             //   window.g_app._store.dispatch({
//             //     type: 'login/logout',
//             //   });
//             return;
//         }
//         // environment should not be used
//         if (status === 403) {
//             // router.push('/exception/403');
//             return;
//         }
//         if (status <= 504 && status >= 500) {
//             // router.push('/exception/500');
//             return;
//         }
//         if (status >= 404 && status < 422) {
//             // router.push('/exception/404');
//         }
//     }
// };


export default async function <T>(url: string, options?: AxiosRequestConfig): Promise<T | undefined> {

    // 配置请求参数等信息
    const result = await instance<T>({ url, ...options, headers: { ...options?.headers, Authorization: `Bearer ${store.get('token')}` } });


    // success
    // config data headers request status statusText
    //
    //
    console.log(result)
    if (result.status === 200) return result.data;

    // http status handle

    return

}

