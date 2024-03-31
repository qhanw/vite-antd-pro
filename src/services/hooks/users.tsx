import { queryUserInfo, queryUserAuth } from '@/services/users';

import { useUserInfo, useAuthKeys } from '@/utils/store';
import { useLayoutEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useInitUserInfo = (token?: string) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const { set: setUserInfo } = useUserInfo();
  const { set: setAuthKeys } = useAuthKeys();

  const navLogin = () => {
    setLoading(false);
    navigate('/login');
  };

  const run = useCallback(async () => {
    setLoading(true);
    try {
      if (!token) return navLogin();

      const [info, authKeys] = await Promise.all([queryUserInfo(), queryUserAuth()]);

      if (!info) return navLogin();
      // 存储到本地
      setAuthKeys(authKeys);
      setUserInfo(info);

      // 返回用户信息
      setData(info);

      setLoading(false);
    } catch (error) {
      navLogin();
    }
  }, []);

  useLayoutEffect(() => {
    run();
  }, [run]);

  return { run, loading, data };
};
