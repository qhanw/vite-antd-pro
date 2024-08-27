import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { message, notification } from 'antd';
import store from '@/utils/store';

const instance = axios.create({
  // baseURL: 'http://10.80.10.95:9001',
  // timeout: 1000,
});

const CODE_MESSAGE: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 异常处理程序
const errorHandler = (error: AxiosError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = CODE_MESSAGE[response.status] || response.statusText;
    const { status, config } = response;

    notification.error({
      message: `请求错误 ${status}: ${config.url}`,
      description: errorText,
    });

    if (status === 401) {
      window.location.href = '/login';
    }
  }
};

type Res<U = any> = { data?: U; code?: number; msg?: string };

export default async function <T>(
  url: string,
  options?: AxiosRequestConfig,
): Promise<T | undefined> {
  const token = store.get('token');
  // 配置请求参数等信息
  const result = await instance<Res<T>>({
    url,
    headers: { ...options?.headers, Authorization: `Bearer ${token}` },
    ...options,
  }).catch(errorHandler);

  const httpStatus = result?.status;

  if (httpStatus && httpStatus >= 200 && httpStatus < 300) {
    const model = result.data;
    if (model.code === 200) return model.data;

    // 后台程序错误处理
    const msg = model.msg ?? '系统错误';
    message.error(msg);
    return Promise.reject(new Error(msg, { cause: model }));
  }

  return Promise.reject(new Error('系统错误'));
}
