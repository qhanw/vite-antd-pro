import { useRef, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

import DelLinkBtn from '@/components/DelLinkBtn';

import { fetchRoles, delRole } from './service';
import type { RoleItem } from './typings';

import AssignAuth from './AssignAuth';
import Mutate from './Mutate';
import type { MutateType } from './Mutate';

export default function Roles() {
  const [role, setRole] = useState<RoleItem>();

  const actionRef = useRef<ActionType>();
  const mutateRef = useRef<MutateType>();

  const columns: ProColumns<RoleItem>[] = [
    { title: '角色名称', dataIndex: 'name' },
    { title: '备注', dataIndex: 'remark' },
    {
      title: '操作',
      valueType: 'option',
      width: 144,
      render: (_, record) =>
        [
          <a key="auth" onClick={() => setRole?.(record)}>
            权限分配
          </a>,
          <a key="edit" onClick={() => mutateRef.current?.open(record)}>
            编辑
          </a>,
        ].concat(
          record.id !== 'root'
            ? [
                <DelLinkBtn
                  key="del"
                  id={record.id}
                  fn={delRole}
                  finish={() => actionRef.current?.reload()}
                />,
              ]
            : [],
        ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<RoleItem>
        actionRef={actionRef}
        rowKey="id"
        headerTitle="角色列表"
        options={false}
        pagination={false}
        search={false}
        columns={columns}
        request={async (params, sort) => {
          const { list, total } = (await fetchRoles({ ...params, sort })) || {};

          return { data: list, success: !!list?.length, total };
        }}
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

      <AssignAuth role={role} onClose={() => setRole(undefined)} />
    </PageContainer>
  );
}
