import { useRef, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
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

  const [roleList, setRoleList] = useState<RoleItem[]>();

  const actionRef = useRef<ActionType>();
  const mutateRef = useRef<MutateType>();

  const columns: ProColumns<RoleItem>[] = [
    { title: '角色名称', dataIndex: 'name' },
    { title: '备注', dataIndex: 'remark' },
    {
      title: '操作',
      valueType: 'option',
      width: 180,
      render: (_, record) =>
        [
          <Tooltip title="新增" key="add">
            <Button
              size="small"
              icon={<PlusOutlined />}
              onClick={() => mutateRef.current?.open({ pid: record.id })}
            />
          </Tooltip>,
          <Tooltip title="编辑" key="edit">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => mutateRef.current?.open(record)}
            />
          </Tooltip>,
          <Tooltip title="权限分配" key="auth">
            <Button size="small" icon={<SettingOutlined />} onClick={() => setRole?.(record)} />
          </Tooltip>,
        ].concat(
          record.id !== 'root'
            ? [
                <DelLinkBtn
                  id={record.id}
                  fn={delRole}
                  finish={() => actionRef.current?.reload()}
                  icon
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
        request={async () => {
          const data = await fetchRoles();

          setRoleList(data || []);

          return { data, success: true, total: data?.length };
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => mutateRef.current?.open()}
            type="primary"
          >
            新增
          </Button>,
        ]}
      />
      <Mutate roleList={roleList} ref={mutateRef} finish={() => actionRef.current?.reload()} />

      <AssignAuth role={role} onClose={() => setRole(undefined)} />
    </PageContainer>
  );
}
