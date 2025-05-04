import { MenuRoute } from '@/types';
type DynamicRoute = {
  path: string;
  element: string;
  children: DynamicRoute[];
} & Partial<MenuRoute>;

export function generateRoutes(routes: MenuRoute[]) {
  if (!routes || routes.length === 0) return routes;
  const dynamicRoutes: DynamicRoute[] = [];
  const routeMap = createRouteMap(routes);
  routes.forEach(route => {
    const currentRoute = routeMap.get(route.menuId);
    if (route.parentId === '0') {
      dynamicRoutes.push(currentRoute);
    } else {
      const parentRoute = routeMap.get(route.parentId);
      if (parentRoute) {
        parentRoute.children.push(currentRoute);
      }
    }
  });
  return dynamicRoutes;
}

export function generateMenu(routes: MenuRoute[]) {
  if (!routes || routes.length === 0) return [];
  const dynamicRoutes: DynamicRoute[] = [];
  const routeMap = createRouteMap(routes);
  routes.forEach(route => {
    const currentRoute = routeMap.get(route.menuId);
    if (route.parentId === '0') {
      dynamicRoutes.push(currentRoute);
    } else {
      const parentRoute = routeMap.get(route.parentId);
      if (parentRoute) {
        parentRoute.children.push(currentRoute);
      }
    }
  });
  // 构造fullpath删除子节点的children
  const newRoutes = dynamicRoutes.map(route => {
    return getFullPathAndRemoveLeafChildren(route, '');
  });
  return newRoutes;
}

function getFullPathAndRemoveLeafChildren(route: DynamicRoute, parentpath: string = '') {
  route.fullpath = (parentpath + '/' + route.path).replace(/\/+/g, '/');
  // 叶子节点
  if (route.children.length === 0) {
    return {
      icon: route.icon,
      label: route.menuName,
      key: route.menuId,
      path: route.path,
      fullpath: route.fullpath,
    };
  }
  return {
    icon: route.icon,
    label: route.menuName,
    key: route.menuId,
    path: route.path,
    children: route.children.map(child =>
      getFullPathAndRemoveLeafChildren(child, parentpath + '/' + route.path),
    ),
    fullpath: route.fullpath,
  };
}

function createRouteMap(routes: MenuRoute[]) {
  const routeMap = new Map<string, DynamicRoute>();
  for (const key in routes) {
    const route = routes[key];
    const currentRoute = {
      ...route,
      element: route.component || '',
      path: route.path || '',
      children: [],
    };
    // 按照实际业务增加loader这里以顶级路由为例
    if (route.parentId === '0') {
      currentRoute.needLoader = true;
    }
    if (route.menuType === 'M') {
      currentRoute.isLayout = true;
    }
    // 处理重定向子路由
    // TODO: 增加权限
    routeMap.set(route.menuId, currentRoute);
  }

  return routeMap;
}
