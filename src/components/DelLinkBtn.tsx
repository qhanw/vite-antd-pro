import { LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Spin, message, Typography, Button, Tooltip } from 'antd';
import { useRequest } from 'ahooks';

type DelLinkBtnProps = {
  id?: string;
  fn: (params?: any) => Promise<any>;
  text?: string;
  finish?: () => void;
  icon?: boolean;
};

const DelLinkBtn = ({ id, fn, finish, text = '删除', icon }: DelLinkBtnProps) => {
  const { run, loading } = useRequest(fn, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功！');
      finish?.();
    },
    onError: () => {
      message.error('删除失败!');
    },
  });

  return icon ? (
    <Tooltip title={text}>
      <Button size="small" icon={<DeleteOutlined />} onClick={() => run(id)} danger />
    </Tooltip>
  ) : (
    <Spin delay={200} spinning={loading} size="small" indicator={<LoadingOutlined />}>
      <Typography.Link type="danger" onClick={() => run(id)}>
        {text}
      </Typography.Link>
    </Spin>
  );
};

export default DelLinkBtn;
