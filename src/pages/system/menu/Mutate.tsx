import { Modal, Form, Input, Radio, message, Select } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { mutateMenu } from './service';
import type { MenuItem } from './typings';

type RefMethods = { open: (val?: MenuItem) => void };
export type MutateType = RefMethods | undefined;

type MutateProps = { finish?: () => void };

const formItemLayout = { labelCol: { span: 5 }, wrapperCol: { span: 19 } };

const MutateAdmin = forwardRef<MutateType, MutateProps>(({ finish }, ref) => {
  const [form] = Form.useForm();

  // 设置一个值用于编辑或新增的表单初始数据，并用于控制窗口显示与隐藏
  const [initVal, setInInitVal] = useState<MenuItem>();

  const isAdd = !initVal?.id;
  const titlePrefix = initVal?.id ? '更新' : '新增';

  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateMenu,
    onSuccess: () => {
      message.success(`${titlePrefix}成功！`);

      // 重置表单初始值，并用于关闭窗口
      setInInitVal(undefined);
      finish?.();
    },
    // onError: () => {
    //   message.error(`${titlePrefix}失败！`);
    // },
  });

  useImperativeHandle(ref, () => ({
    open: (val) => {
      form.resetFields();
      if (val) form.setFieldsValue(val);
      setInInitVal(val || { enable: true });
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
      title={`${titlePrefix}菜单`}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={isPending}
    >
      <Form form={form} {...formItemLayout} initialValues={{ enable: true }}>
        <Form.Item
          label="菜单名称"
          name="name"
          rules={[{ required: true, message: '请输入菜单名称！' }]}
        >
          <Input placeholder="菜单名称" />
        </Form.Item>
        <Form.Item label="所属菜单" name="pid">
          <Input placeholder="菜单名称" />
        </Form.Item>
        <Form.Item
          label="类型"
          name="menuType"
          rules={[{ required: true, message: '请选择菜单类型！' }]}
        >
          <Select
            options={[
              { label: 'MODULE', value: 'MODULE' },
              { label: 'BOOK', value: 'BOOK' },
              { label: 'MENU', value: 'MENU' },
              { label: 'BUTTON', value: 'BUTTON' },
            ]}
            placeholder="菜单类型"
          />
        </Form.Item>
        <Form.Item
          label="菜单路经"
          name="path"
          rules={[{ required: true, message: '请输入菜单路经！' }]}
        >
          <Input placeholder="菜单路经" />
        </Form.Item>
        <Form.Item label="图标" name="icon">
          <Input placeholder="图标" />
        </Form.Item>
        <Form.Item label="权限KEY" name="perms">
          <Input placeholder="权限KEY" />
        </Form.Item>

        <Form.Item label="是否可用" name="enable">
          <Radio.Group
            options={[
              { label: '是', value: true },
              { label: '否', value: false },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default MutateAdmin;
