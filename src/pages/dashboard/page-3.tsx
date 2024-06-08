import { useLoaderData } from 'react-router-dom';
import { UserInfo } from '@/services/users';

export default () => {
  const { info } = useLoaderData() as { info: UserInfo };
  return <>Page 3: {info.name}</>;
};
