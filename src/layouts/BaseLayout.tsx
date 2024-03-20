import { useLayoutEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  InfoCircleFilled,
  QuestionCircleFilled,
  LogoutOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { Input, Dropdown, theme } from 'antd';
import { ProLayout } from '@ant-design/pro-components';

import defaultProps from '@/../config/site.cfg';

import { useUserInfo } from '@/utils/store';
import { useSignOut } from '@/services/hooks/sign';

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
  const location = useLocation();
  const navigate = useNavigate();

  const [pathname, setPathname] = useState(location.pathname || '/');

  const { data: info } = useUserInfo();

  const signOut = useSignOut();

  useLayoutEffect(() => {
    if (!info?.id) navigate('/login');
  }, [info]);

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
      location={{ pathname }}
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
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
}
