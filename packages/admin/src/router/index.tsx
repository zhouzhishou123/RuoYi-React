import { cloneDeep } from 'lodash-es';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import AuthGuard from '../permission/AuthGuard';
import authGuardLoader from '../permission/authGuardLoader';
const pages = import.meta.glob('@/pages/**/*.tsx');
const layouts = import.meta.glob('@/layouts/**/*.tsx', { eager: true, import: 'default' });
export const loadView = view => {
  let res = null;
  for (const path in pages) {
    const dir = path.split('pages/')[1].split('.tsx')[0];
    if (dir === view) {
      const Component = lazy(pages[path]);
      res = <Component />;
      break;
    }
  }
  // 如果pages中没有找到，则加载layout
  if (res) {
    return res;
  }
  // 加载layout
  for (const path in layouts) {
    const dir = path.split('layouts/')[1].split('.tsx')[0];
    if (dir === view) {
      const Component = layouts[path];
      res = <AuthGuard>{<Component />}</AuthGuard>;
      break;
    }
  }
  return res;
};

export function generateRouteObject(rawRoutes: RouteConfig[]): RouteObject[] {
  if (rawRoutes.length === 0) return [];
  const routeObjects = cloneDeep(rawRoutes);
  return routeObjects.map(item => {
    const route: RouteObject = {
      path: item.path,
      loader: authGuardLoader,
      handle: {
        menuName: item.menuName,
        routeName: item.routeName,
        icon: item.icon,
        perms: item.perms,
        path: item.path,
      },
      element: item.layout ? loadView(item.layout) : loadView(item.component),
    };
    if (item.children && item.children.length > 0) {
      route.children = generateRouteObject(item.children);
    } else {
      // 顶级路由有layout
      if (item.layout) {
        route.children = [
          {
            path: item.path,
            element: loadView(item.component),
            handle: {
              menuName: item.menuName,
              routeName: item.routeName,
              icon: item.icon,
              perms: item.perms,
              path: item.path,
            },
          },
        ];
      }
    }
    return route;
  });
}
// rawRoutes后台返回的
export function generateDynamicRoutes(rawRoutes) {
  const routes = cloneDeep(rawRoutes);
  const genSingleChildren = item => {
    return [
      {
        path: item.path,
        element: loadView(item.component),
      },
    ];
  };
  return routes.map(item => {
    const route: RouteObject = {
      path: item.path,
      loader: authGuardLoader,
      element: item.layout ? loadView(item.layout) : loadView(item.component),
      children:
        item.children && item.children.length > 0
          ? generateDynamicRoutes(item.children)
          : genSingleChildren(item),
    };
    return route;
  });
}
