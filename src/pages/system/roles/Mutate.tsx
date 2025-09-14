import { Modal, Form, Input, TreeSelect, message } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { mutateRole } from './service';
import type { RoleItem } from './typings';

type RefMethods = { open: (val?: RoleItem) => void };
export type MutateType = RefMethods | undefined;

type MutateProps = { finish?: () => void; roleList?: RoleItem[] };

const formItemLayout = { labelCol: { span: 5 }, wrapperCol: { span: 19 } };

const MutateAdmin = forwardRef<MutateType, MutateProps>(({ finish, roleList }, ref) => {
  const [form] = Form.useForm();

  // 设置一个值用于编辑或新增的表单初始数据，并用于控制窗口显示与隐藏
  const [initVal, setInInitVal] = useState<RoleItem>();

  const isAdd = !initVal?.id;
  const titlePrefix = initVal?.id ? '编辑' : '新增';

  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateRole,
    onSuccess: () => {
      message.success(`${titlePrefix}成功！`);

      // 重置表单初始值，并用于关闭窗口
      setInInitVal(undefined);
      finish?.();
    },
    // onError: (e) => {
    //   console.log(e.cause)
    //   message.error(`${titlePrefix}失败！`);
    // },
  });

  useImperativeHandle(ref, () => ({
    open: (val) => {
      form.resetFields();
      if (val) form.setFieldsValue(val);
      setInInitVal(val || {});
    },
  }));

  const onCancel = () => setInInitVal(undefined);

  const onOk = async () => {
    const fieldsVal = await form.validateFields().catch(console.error);
    if (!fieldsVal) return;
    await mutateAsync(isAdd ? fieldsVal : { ...fieldsVal, id: initVal?.id });
  };

  return (
    <Modal
      open={!!initVal}
      title={`${titlePrefix}角色`}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={isPending}
    >
      <Form form={form} {...formItemLayout}>
        <Form.Item
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '请输入角色名称！' }]}
        >
          <Input placeholder="角色名称" />
        </Form.Item>

        <Form.Item label="父级角色" name="pid">
          <TreeSelect
            placeholder="父级角色"
            disabled={!initVal?.id && !!initVal?.pid}
            treeData={roleList}
            fieldNames={{ label: 'name', value: 'id' }}
            allowClear
          />
        </Form.Item>

        <Form.Item label="备注" name="remark">
          <Input.TextArea placeholder="备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default MutateAdmin;
