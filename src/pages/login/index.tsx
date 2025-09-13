import { Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';

import { useSignIn } from '@/services/hooks/sign';

const LoginMessage: React.FC<{ content: string }> = ({ content }) => {
  return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
};

export default function Login() {
  const { userLoginState, signIn } = useSignIn();

  const onSubmit = async (values: any) => {
    await signIn(values);
  };

  return (
    <LoginForm
      title="Vite Antd Pro"
      subTitle="全球最大的代码托管平台"
      onFinish={async (values) => await onSubmit(values)}
    >
      {userLoginState && <LoginMessage content="账户或密码错误(admin/ant.design)" />}
      <ProFormText
        name="username"
        fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
        placeholder="用户名: admin or user"
        rules={[{ required: true, message: '请输入用户名!' }]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
        placeholder="密码: ant.design"
        rules={[{ required: true, message: '请输入密码！' }]}
      />
    </LoginForm>
  );
}
