import { useLayoutEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  InfoCircleFilled,
  QuestionCircleFilled,
  LoginOutlined,
} from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";

import defaultProps from "../site.cfg";

import { useUserInfo } from "@/utils/store";
import { useSignOut } from "@/hooks/services/sign";

export default () => {
  const [initPathname] = useState("/");
  const [pathname, setPathname] = useState(initPathname);
  const navigate = useNavigate();

  const { data: info } = useUserInfo();

  const signOut = useSignOut();

  useLayoutEffect(() => {
    if (!info?.id) navigate("/login");
  }, [info]);

  return (
    <ProLayout
      siderWidth={216}
      bgLayoutImgList={[
        {
          src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
          left: 85,
          bottom: 100,
          height: "303px",
        },
        {
          src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
          bottom: -68,
          right: -45,
          height: "303px",
        },
        {
          src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
          bottom: 0,
          left: 0,
          width: "331px",
        },
      ]}
      {...defaultProps}
      location={{
        pathname,
      }}
      avatarProps={{
        src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
        title: info?.username?.toUpperCase(),
        size: "small",
      }}
      actionsRender={(props) => {
        if (props.isMobile) return [];
        return [
          <InfoCircleFilled key="InfoCircleFilled" />,
          <QuestionCircleFilled key="QuestionCircleFilled" />,
          <LoginOutlined key="LoginOutlined" onClick={() => signOut()} />,
        ];
      }}
      menuItemRender={(item, dom) => (
        <Link
          to={item.path!}
          onClick={() => setPathname(item.path || initPathname)}
        >
          {dom}
        </Link>
      )}
    >
      <PageContainer>
        <ProCard style={{ height: "100vh", minHeight: 800 }}>
          <Outlet />
        </ProCard>
      </PageContainer>
    </ProLayout>
  );
};
