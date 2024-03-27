import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Alert, Button } from 'antd';
import { useRef } from 'react';

import DelLinkBtn from '@/components/DelLinkBtn';

import { fetchSysMenu, delMenu } from './service';
import type { MenuItem } from './typings';

import Mutate from './Mutate';
import type { MutateType } from './Mutate';

export default function Admin() {
  const actionRef = useRef<ActionType>();
  const mutateRef = useRef<MutateType>();

  const columns: ProColumns<MenuItem>[] = [
    { title: '菜单名称', dataIndex: 'name' },
    { title: '类型', dataIndex: 'menuType' },
    { title: '菜单路径', dataIndex: 'path' },
    { title: '图标', dataIndex: 'icon' },
    {
      title: '是否可用',
      dataIndex: 'enable',
      valueType: 'select',
      valueEnum: {
        true: { text: '是', status: 'Processing' },
        false: { text: '否', status: 'Default' },
      },
    },

    // { title: '更新时间', dataIndex: 'updateTime', valueType: 'dateTime' },
    // { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) =>
        [
          <a key="edit" onClick={() => mutateRef.current?.open(record)}>
            编辑
          </a>,
        ].concat(
          record.id !== 'root'
            ? [
                <DelLinkBtn
                  key="del"
                  id={record.id}
                  fn={delMenu}
                  finish={() => actionRef.current?.reload()}
                />,
              ]
            : [],
        ),
    },
  ];

  return (
    <PageContainer>
      <Alert
        showIcon
        type="warning"
        message="菜单模块不再维护"
        description="菜单模块变更为权限配置，权限方案转由前端JSON方式配置，并交由后端更新到权限表。"
        style={{ marginBottom: 24 }}
      />
      <ProTable<MenuItem>
        search={false}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async () => {
          const data = await fetchSysMenu();

          return { data: data || [], success: !!data };
        }}
        rowKey="id"
        headerTitle="菜单列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => mutateRef.current?.open()}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <Mutate ref={mutateRef} finish={() => actionRef.current?.reload()} />
    </PageContainer>
  );
}
