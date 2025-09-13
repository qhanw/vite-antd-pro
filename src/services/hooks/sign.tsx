import { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import type { SignIn } from '@/services/sign';
import { signIn, signOut } from '@/services/sign';

import store, { setToken } from '@/utils/store';

/** user login */
export const useSignIn = () => {
  const navigate = useNavigate();

  const [userLoginState, setUserLoginState] = useState<SignIn>();

  const login = async (values: SignIn) => {
    try {
      // 登录
      const token = await signIn(values);

      // 如果失败去设置用户错误信息
      if (!token) return;

      // 本地缓存 token
      setToken(token);

      // 跳转到主页
      const urlParams = new URL(window.location.href).searchParams;
      navigate(urlParams.get('redirect') || '/');
    } catch (error) {
      setUserLoginState(values);

      message.destroy();
      message.error('登录失败，请重试！');

      console.error(error);
    }
  };

  return { userLoginState, signIn: login };
};

/** user login out */
export const useSignOut = () => {
  const navigate = useNavigate();

  const loginOut = async () => {
    try {
      await signOut();
      message.success('操作成功！');
      // clean storage
      store.clearAll();

      const urlParams = new URL(window.location.href).searchParams;

      navigate(urlParams.get('redirect') || '/login');
      return;
    } catch (error) {
      console.error(error);
      message.error('退出失败，请重试！');
    }
  };

  return loginOut;
};
