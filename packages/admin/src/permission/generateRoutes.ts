import { MenuRoute } from '@/types';
import { RouteConfig } from '../types';

export function buildRouteTree(routes: RouteConfig[]) {
  if (!routes || routes.length === 0) return [];
  const dynamicRoutes: RouteConfig[] = [];
  const routeMap = createRouteMap(routes);
  routes.forEach(route => {
    const currentRoute = routeMap.get(route.menuId);
    if (route.parentId === '0') {
      dynamicRoutes.push(currentRoute);
    } else {
      const parentRoute = routeMap.get(route.parentId);
      if (parentRoute) {
        if (!parentRoute.children) {
          parentRoute.children = [];
        }
        parentRoute.children.push(currentRoute);
      }
    }
  });
  return dynamicRoutes;
}

export function generateMenu(routes: MenuRoute[]) {
  const routeTree = buildRouteTree(routes);
  // 生成菜单列表，同时给每个路由节点追加 fullPath
  return routeTree.map(route => {
    return appendFullPathToRoutes(route, '');
  });
}

function appendFullPathToRoutes(route: RouteConfig, parentpath: string = '') {
  route.fullpath = (parentpath + '/' + route.path).replace(/\/+/g, '/');
  const menuItem = {
    icon: route.icon,
    label: route.menuName,
    key: route.menuId,
    path: route.path,
    fullpath: route.fullpath,
  };
  // 叶子节点
  if (!route.children) {
    return menuItem;
  }
  return {
    ...menuItem,
    children: route.children.map(child =>
      appendFullPathToRoutes(child, parentpath + '/' + route.path),
    ),
  };
}

function createRouteMap(routes: RouteConfig[]) {
  if (routes == null || routes.length === 0) return [];
  const routeMap = new Map<string, RouteConfig>();
  for (const key in routes) {
    const route = routes[key];
    const currentRoute = {
      ...route,
      element: route.component,
    };
    routeMap.set(route.menuId, currentRoute);
  }

  return routeMap;
}
