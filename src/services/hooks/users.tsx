import { queryUserInfo, queryUserAuth } from '@/services/users';

import { setUserInfo, setAuthKeys } from '@/utils/store';
import { useLayoutEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';

export const useInitUserInfo = (token?: string) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const navLogin = () => {
    setLoading(false);
    navigate('/login');
  };

  const run = useCallback(async () => {
    setLoading(true);
    try {
      if (!token) return navLogin();

      console.log('Query User Info');

      const [info, authKeys] = await Promise.all([queryUserInfo(), queryUserAuth()]);

      if (!info) return navLogin();
      // 存储到本地
      setAuthKeys(authKeys);
      setUserInfo(info as any);

      // 返回用户信息
      setData(info);

      setLoading(false);
    } catch {
      navLogin();
    }
  }, []);

  useLayoutEffect(() => {
    run();
  }, [run]);

  return { run, loading, data };
};
