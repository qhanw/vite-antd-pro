import React, { useEffect, useMemo, useState } from 'react';
import { Tree, Empty, Button, Drawer, Space, message } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { useRequest } from 'ahooks';

import { queryAllAuthList, queryRoleAuthList, bindRoleAuth } from './service';
import type { RoleItem } from './typings';

type AuthKeys = React.Key[];
type AssignAuthProps = { role?: RoleItem; onClose?: () => void };

const findParentKeys = function f(node: TreeDataNode[]) {
  return node.reduce((prev, curr) => {
    if (curr.children) prev.push(curr.key, ...f(curr.children));
    return prev;
  }, [] as AuthKeys);
};

const findNodeKey = function f(
  data: TreeDataNode[],
  key: string | number,
): string | number | undefined {
  if (!data || !key) return undefined;
  for (let i = 0, len = data.length; i < len; i++) {
    const curr = data[i];

    if (curr.children) {
      const node = f(curr.children, key);
      if (node) return node;
    }

    if (curr.key === key && !curr.children?.length) return curr.key;
  }
  return undefined;
};

// 权限树初始值
const initVal: { authList: TreeDataNode[]; allExKey: AuthKeys } = {
  authList: [],
  allExKey: [],
};

export default function AssignAuth({ role, onClose }: AssignAuthProps) {
  const roleId = useMemo(() => role?.id, [role?.id]);

  // 当前选择的权限，用于表单提交
  const [authKeys, setAuthKeys] = useState<AuthKeys>([]);

  const [expandedKeys, setExpandedKeys] = useState<AuthKeys>([]);
  const [checkedKeys, setCheckedKeys] = useState<AuthKeys>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (exKeys: AuthKeys) => {
    console.log('onExpand', exKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(exKeys);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, { halfCheckedKeys }) => {
    if (Array.isArray(checkedKeys)) {
      setCheckedKeys(checkedKeys);
      setAuthKeys([...checkedKeys, ...(halfCheckedKeys || [])]);
    }
  };

  // 获取当前角色已绑定权限
  const { run: submit, loading: confirmLoading } = useRequest(bindRoleAuth, {
    manual: true,
    onSuccess: () => message.success('权限分配成功！'),
  });

  // 获取权限树数据
  const { data: { authList, allExKey } = initVal } = useRequest(
    async () => {
      const res = await queryAllAuthList();
      const allExKey = findParentKeys(res as TreeDataNode[]);

      return { authList: res, allExKey };
    },
    {
      ready: !!role,
      onSuccess: (d) => {
        //  初始化展开整棵树
        setExpandedKeys(d.allExKey);
      },
    },
  );

  const { run: fetch } = useRequest(queryRoleAuthList, {
    manual: true,
    onSuccess: (d) => {
      const showAuth = d?.filter((c) => findNodeKey(authList as any, c));
      setCheckedKeys(showAuth as AuthKeys);
      setAuthKeys(d as AuthKeys);
    },
  });

  useEffect(() => {
    if (roleId && authList?.length) fetch(roleId);
  }, [roleId, authList?.length]);

  useEffect(() => {
    // 初始化权限树
    setCheckedKeys([]);
    setExpandedKeys(allExKey);
  }, [roleId]);

  return (
    <Drawer
      title={`权限分配${role ? `：${role?.name}` : ''}`}
      width={500}
      onClose={onClose}
      open={!!roleId}
      extra={
        <Space>
          <Button onClick={onClose}>关闭</Button>
          <Button
            loading={confirmLoading}
            type="primary"
            onClick={() => submit(roleId!, authKeys as string[])}
          >
            确定
          </Button>
        </Space>
      }
    >
      {role && authList?.length ? (
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={authList as TreeDataNode[]}
          selectable={false}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginBlock: 120 }} />
      )}
    </Drawer>
  );
}
