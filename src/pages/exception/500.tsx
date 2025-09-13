import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

export default () => {
  const navigate = useNavigate();
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          Back Home
        </Button>
      }
    />
  );
};
