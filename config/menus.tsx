import base, { Route } from './base';
import { access } from './access';

const genMenus = function f(r: Route[], parent?: Route) {
  return r.reduce((prev, curr) => {
    const { index, children, icon, path } = curr;

    if (index) curr.path = parent?.path || '/';

    if (icon && typeof icon === 'string') {
      curr.icon = <span className={`anticon ${icon}`} />;
    }

    // 权限过滤
    const pass = curr.access ? access[curr.access](curr) : true;
    if (pass && path !== '*') {
      prev.push({ ...curr, ...(children ? { children: f(children, curr) } : {}) });
    }

    return prev;
  }, [] as Route[]);
};

export const menus = () => genMenus(base.filter((node) => node.path === '/')).at(-1);
