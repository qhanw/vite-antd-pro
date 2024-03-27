import { Modal, Form, Input, Radio, message } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { useRequest } from 'ahooks';
import { mutateRole } from './service';
import { RoleItem } from './typings';

type RefMethods = { open: (val?: RoleItem) => void };
export type MutateType = RefMethods | undefined;

type MutateProps = { finish?: () => void };

const formItemLayout = { labelCol: { span: 5 }, wrapperCol: { span: 19 } };

const MutateAdmin = forwardRef<MutateType, MutateProps>(({ finish }, ref) => {
  const [form] = Form.useForm();

  // 设置一个值用于编辑或新增的表单初始数据，并用于控制窗口显示与隐藏
  const [initVal, setInInitVal] = useState<RoleItem>();

  const isAdd = !initVal?.id;
  const titlePrefix = initVal?.id ? '更新' : '新增';

  const { runAsync, loading } = useRequest(async (d) => mutateRole(d), {
    manual: true,
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
      setInInitVal(val || { id: 0, enable: true });
    },
  }));

  const onCancel = () => setInInitVal(undefined);

  const onOk = async () => {
    const fieldsVal = await form.validateFields().catch(console.error);
    if (!fieldsVal) return;
    await runAsync(isAdd ? fieldsVal : { ...fieldsVal, id: initVal?.id });
  };

  return (
    <Modal
      open={!!initVal}
      title={`${titlePrefix}角色`}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form form={form} {...formItemLayout} initialValues={{ enable: true }}>
        <Form.Item
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '请输入角色名称！' }]}
        >
          <Input placeholder="角色名称" />
        </Form.Item>

        <Form.Item label="是否可用" name="enable">
          <Radio.Group
            options={[
              { label: '是', value: true },
              { label: '否', value: false },
            ]}
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
