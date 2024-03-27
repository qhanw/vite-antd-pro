import { ProLayoutProps } from '@ant-design/pro-components';

import { menus } from './routes';

const cfg: ProLayoutProps = {
  title: 'Vite Antd Pro',
  route: menus,
  location: { pathname: '/' },
  appList: [
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      title: 'Ant Design',
      desc: '杭州市较知名的 UI 设计语言',
      url: 'https://ant.design',
    },
  ],
};

export default cfg;
