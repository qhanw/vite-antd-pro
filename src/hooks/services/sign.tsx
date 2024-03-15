import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { signIn, signOut, SignInRes } from "@/services/sign";
import { fetchUserInfo } from "@/services/users";

import store, { useToken, useUserInfo } from "@/utils/store";

/** user login */
export const useSignIn = () => {
  const { set: setToken } = useToken();
  const { set: setUserInfo } = useUserInfo();

  const navigate = useNavigate();

  const [userLoginState, setUserLoginState] = useState<SignInRes>({
    code: 200,
  });

  const login = async (values: any) => {
    try {
      // 登录
      const res = await signIn(values);

      if (res?.code === 200) {
        // 本地缓存 token
        setToken(res.data!);
        const info = await fetchUserInfo();

        if (info?.code === 200) {
          message.success("登录成功");
          setUserInfo(info.data);

          const urlParams = new URL(window.location.href).searchParams;
          navigate(urlParams.get("redirect") || "/");

          return;
        }
        // setUserLoginState(info);
        return;
      }
      console.log(res);
      // 如果失败去设置用户错误信息
      setUserLoginState(res!);
    } catch (error) {
      console.log(error);
      message.error("登录失败，请重试！");
    }
  };

  return { userLoginState, signIn: login };
};

/** user login out */
export const useSignOut = () => {
  const navigate = useNavigate();

  const loginOut = async () => {
    try {
      const res = await signOut();
      if (res?.code === 200) {
        message.success("操作成功！");
        // clean storage
        store.clearAll();

        const urlParams = new URL(window.location.href).searchParams;

        navigate(urlParams.get("redirect") || "/login");
        return;
      }
    } catch (error) {
      console.log(error);
      message.error("退出失败，请重试！");
    }
  };

  return loginOut;
};
