import { Modal, Form, Input, Radio, Select, Alert, message } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { mutateAdmin } from './service';
import type { AdminItem } from './typings';

type RefMethods = { open: (val?: AdminItem) => void };
export type MutateType = RefMethods | undefined;

type MutateProps = {
  opts: { roles?: API.EnumItem[]; [propName: string]: any };
  finish?: () => void;
};

const formItemLayout = { labelCol: { span: 5 }, wrapperCol: { span: 19 } };

const MutateAdmin = forwardRef<MutateType, MutateProps>(({ opts, finish }, ref) => {
  const [form] = Form.useForm();
  const pwd = Form.useWatch('password', form);
  // 设置一个值用于编辑或新增的表单初始数据，并用于控制窗口显示与隐藏
  const [initVal, setInInitVal] = useState<AdminItem>();

  const isAdd = !initVal?.id;
  const titlePrefix = initVal?.id ? '更新' : '新增';

  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateAdmin,
    onSuccess: () => {
      message.success(`${titlePrefix}成功！`);

      // 重置表单初始值，并用于关闭窗口
      setInInitVal(undefined);
      finish?.();
    },
    onError: () => {
      message.error(`${titlePrefix}失败！`);
    },
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
      title={`${titlePrefix}管理员`}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={isPending}
    >
      <Form form={form} {...formItemLayout} initialValues={{ enable: false }}>
        <Form.Item
          label="管理员名称"
          name="name"
          rules={[{ required: true, message: '请输入管理员名称！' }]}
        >
          <Input placeholder="管理员名称" />
        </Form.Item>

        <Form.Item
          label="角色"
          name="roleId"
          rules={[{ required: true, message: '请输入管理员名称！' }]}
        >
          <Select options={opts.roles} placeholder="请选择角色" />
        </Form.Item>
        <Form.Item label="是否可用" name="enable">
          <Radio.Group
            options={[
              { label: '是', value: true },
              { label: '否', value: false },
            ]}
          />
        </Form.Item>

        {isAdd ? null : (
          <Alert
            message="编辑时输入密码表示修改管理员密码"
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        <Form.Item
          label="密码"
          name="password"
          rules={[
            ...(isAdd || pwd ? [{ required: true, message: '请输入密码！' }] : []),
            { pattern: /^.{6,18}$/, message: '请输入6-18位的密码！' },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          label="确定密码"
          name="confirmPwd"
          dependencies={['password']}
          hasFeedback
          rules={[
            ...(isAdd || pwd ? [{ required: true, message: '请再次输入密码！' }] : []),
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('确定密码不匹配！'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default MutateAdmin;
