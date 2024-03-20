import { LoadingOutlined } from "@ant-design/icons";
import { Spin, message, Typography } from "antd";
import { useRequest } from "ahooks";

type DelLinkBtnProps = {
  id: string | number;
  fn: (params?: any) => Promise<any>;
  text?: string;
  finish?: () => void;
};

const DelLinkBtn = ({ id, fn, finish, text = "删除" }: DelLinkBtnProps) => {
  const { run, loading } = useRequest(fn, {
    manual: true,
    onSuccess: () => {
      message.success("删除成功！");
      finish?.();
    },
    onError: () => {
      message.error("删除失败!");
    },
  });

  return (
    <Spin
      delay={200}
      spinning={loading}
      size="small"
      indicator={<LoadingOutlined />}
    >
      <Typography.Link onClick={() => run(id)}>{text}</Typography.Link>
    </Spin>
  );
};

export default DelLinkBtn;
