import { useState } from 'react';
import { Outlet, Link, useLocation, useLoaderData, redirect } from 'react-router-dom';
import {
  InfoCircleFilled,
  QuestionCircleFilled,
  LogoutOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { Input, Dropdown, theme } from 'antd';
import { ProLayout } from '@ant-design/pro-components';

import defaultProps from '@/../config/site.cfg';
import { menus } from '@/../config/menus';

import { getToken } from '@/utils/store';
import { useSignOut } from '@/services/hooks/sign';

import { queryUserInfo, queryUserAuth, UserInfo } from '@/services/users';

const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <Input
      style={{
        borderRadius: 4,
        marginInlineEnd: 12,
        backgroundColor: token.colorBgTextHover,
      }}
      prefix={<SearchOutlined style={{ color: token.colorTextLightSolid }} />}
      placeholder="搜索方案"
      variant="borderless"
    />
  );
};

export default function BaseLayout() {
  const signOut = useSignOut();

  const location = useLocation();
  const { info } = useLoaderData() as { info: UserInfo };

  const [pathname, setPathname] = useState(location.pathname || '/');

  return (
    <ProLayout
      layout="mix"
      siderWidth={216}
      bgLayoutImgList={[
        {
          src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
          left: 85,
          bottom: 100,
          height: '303px',
        },
        {
          src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
          bottom: -68,
          right: -45,
          height: '303px',
        },
        {
          src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
          bottom: 0,
          left: 0,
          width: '331px',
        },
      ]}
      {...defaultProps}
      route={menus()}
      location={{ pathname }}
      avatarProps={{
        // src: '',
        icon: '涵',
        size: 'small',
        title: info?.name?.toUpperCase(),
        render: (_, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', onClick: signOut },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      actionsRender={(props) => {
        if (props.isMobile) return [];
        return [
          props.layout !== 'side' && document.body.clientWidth > 1400 ? <SearchInput /> : undefined,
          <InfoCircleFilled key="InfoCircleFilled" />,
          <QuestionCircleFilled key="QuestionCircleFilled" />,
        ];
      }}
      menuItemRender={(item, dom) => (
        <Link to={item.path!} onClick={() => setPathname(item.path || pathname)}>
          {dom}
        </Link>
      )}
    >
      <Outlet />
    </ProLayout>
  );
}

export async function loader() {
  const navLogin = () => redirect('/login');
  const token = getToken();
  if (!token) return navLogin();

  try {
    console.log('Query User Info');
    const [info, authKeys] = await Promise.all([queryUserInfo(), queryUserAuth()]);

    if (!info) return navLogin();
    // 存储到本地
    // setAuthKeys(authKeys);
    // setUserInfo(info);

    // // 返回用户信息
    // setData(info);

    return { info, authKeys };
  } catch (error) {
    return navLogin();
  }
}
