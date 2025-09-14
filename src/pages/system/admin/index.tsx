import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import DelLinkBtn from '@/components/DelLinkBtn';

import { fetchSysAdmin, fetchRolesEnum, delAdmin } from './service';
import type { AdminItem } from './typings';

import MutateAdmin from './MutateAdmin';
import type { MutateType } from './MutateAdmin';

export default function Admin() {
  const actionRef = useRef<ActionType>();
  const mutateRef = useRef<MutateType>();

  const { data: roles } = useQuery({
    queryKey: ['roles-enum'],
    queryFn: fetchRolesEnum,
  });

  const columns: ProColumns<AdminItem>[] = [
    { title: '管理员名称', dataIndex: 'name' },
    {
      title: '角色名称',
      dataIndex: 'roleId',
      valueType: 'select',
      fieldProps: { options: roles },
    },
    {
      title: '是否可用',
      dataIndex: 'enable',
      valueType: 'select',
      valueEnum: {
        true: { text: '是', status: 'Processing' },
        false: { text: '否', status: 'Default' },
      },
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      search: false,
      editable: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
      editable: false,
    },
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
          record.roleId !== 'root'
            ? [
                <DelLinkBtn
                  key="del"
                  id={record.id}
                  fn={delAdmin}
                  finish={() => actionRef.current?.reload()}
                />,
              ]
            : [],
        ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<AdminItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort) => {
          const data = await fetchSysAdmin({ ...params, sort });

          return {
            data: data?.list || [],
            success: !!data,
            total: data?.total || 0,
          };
        }}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        options={{ setting: { listsHeight: 400 } }}
        dateFormatter="string"
        headerTitle="管理员列表"
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
      <MutateAdmin opts={{ roles }} ref={mutateRef} finish={() => actionRef.current?.reload()} />
    </PageContainer>
  );
}
