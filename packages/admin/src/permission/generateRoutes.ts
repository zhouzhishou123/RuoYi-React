import { RouteConfig } from '../types';

export function buildRouteTree(routes: RouteConfig[]) {
  if (!routes || routes.length === 0) return [];

  const routeMap = createRouteMap(routes);
  const dynamicRoutes: RouteConfig[] = [];

  // 一次性构建路由树，减少重复遍历
  for (const route of routes) {
    const currentRoute = routeMap.get(route.menuId);
    if (!currentRoute) continue;

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
  }

  return dynamicRoutes;
}

export function generateMenu(routes: RouteConfig[]) {
  // 过滤隐藏的菜单
  const visibleRoutes = routes.filter(route => !route.hidden);
  // 构建路由树
  const routeTree = buildRouteTree(visibleRoutes);
  // 生成菜单列表，同时给每个路由节点追加 fullPath
  return routeTree.map(route => {
    return appendFullPathToRoutes(route, '');
  });
}

function appendFullPathToRoutes(route: RouteConfig, parentpath: string = '') {
  const fullpath = (parentpath + '/' + route.path).replace(/\/+/g, '/');
  const menuItem = {
    icon: route.icon,
    label: route.menuName,
    key: route.menuId,
    path: route.path,
    isFrame: route.isFrame,
    fullpath,
  };

  // 叶子节点
  if (!route.children || route.children.length === 0) {
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
  if (routes == null || routes.length === 0) return new Map<string, RouteConfig>();
  const routeMap = new Map<string, RouteConfig>();

  // 使用 for...of 替代 for...in 以提高性能
  for (const route of routes) {
    const currentRoute = {
      ...route,
      element: route.component,
    };
    routeMap.set(route.menuId, currentRoute);
  }

  return routeMap;
}
