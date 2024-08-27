import { useLoaderData } from 'react-router-dom';
import type { UserInfo } from '@/services/users';

export default () => {
  const { data } = (useLoaderData() as { data: [UserInfo, string[]] }) || {};
  return <>Page 3: {data?.[0].name}</>;
};
