import { Suspense, useEffect, useState } from 'react';
import {
  Outlet,
  Link,
  Await,
  useNavigate,
  useLocation,
  useLoaderData,
  useAsyncValue,
  redirect,
  defer,
} from 'react-router-dom';
import {
  InfoCircleFilled,
  QuestionCircleFilled,
  LogoutOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { Input, Dropdown, theme } from 'antd';
import { ProLayout, PageLoading } from '@ant-design/pro-components';

import ErrorElement from '@/pages/exception/ErrorElement';

import defaultProps from '@/../config/site.cfg';
import { menus } from '@/../config/menus';

import { getToken, setUserInfo, setAuthKeys } from '@/utils/store';
import { useSignOut } from '@/services/hooks/sign';

import { queryUserInfo, queryUserAuth, UserInfo } from '@/services/users';

const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <Input
      style={{ borderRadius: 4, marginInlineEnd: 12, backgroundColor: token.colorBgTextHover }}
      prefix={<SearchOutlined style={{ color: token.colorTextLightSolid }} />}
      placeholder="搜索方案"
      variant="borderless"
    />
  );
};

const Layout = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();
  const [info] = useAsyncValue() as [UserInfo, string[]];

  const [pathname, setPathname] = useState(location.pathname || '/');

  useEffect(() => {
    if (!info) navigate('/login');
  }, [info, navigate]);

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
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                    onClick: signOut,
                  },
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
};

export default function BaseLayout() {
  const { data } = useLoaderData() as { data: [UserInfo, string[]] };
  return (
    <Suspense fallback={<PageLoading />}>
      <Await resolve={data} errorElement={<ErrorElement />} children={<Layout />} />
    </Suspense>
  );
}

export async function loader() {
  const navLogin = () => redirect('/login');
  const token = getToken();
  if (!token) return navLogin();

  // console.log('Query User Info');
  // 在此处设置本地需要存储的用户信息
  const data = Promise.all([queryUserInfo(), queryUserAuth()]).then((res) => {
    const [info, authKeys] = res;

    if (authKeys) setAuthKeys(authKeys);
    if (info) setUserInfo(info as any);

    return [info, authKeys];
  });

  return defer({ data });
}
