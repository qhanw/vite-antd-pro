import { getAuthKeys } from '@/utils/store';

type AccessProps = {
  accessible: string | string[];
  fallback?: React.ReactNode;
  children?: React.ReactNode;
};

export function Access({ accessible, fallback, children }: AccessProps) {
  const authKeys = [accessible].flat(1);

  const keys = getAuthKeys();

  const allow = authKeys.some((c) => keys.includes(c));

  if (allow) return <>{children}</>;

  return <>{fallback ? fallback : ''}</>;
}

export function useAccess() {
  const keys = getAuthKeys();
  const check = (authKeys: string | string[]) => {
    return [authKeys].flat(1).some((c) => keys.includes(c));
  };

  return { check };
}
