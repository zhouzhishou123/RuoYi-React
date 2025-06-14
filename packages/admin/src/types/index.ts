import { MenuProps } from 'antd';
export type MenuItem = Required<MenuProps>['items'][number];
export interface MenuRoute {
  menuId: string; // 菜单ID
  parentId: string | null; // 父菜单ID，默认为'0'
  menuName: string; // 菜单名称
  orderNum: number | null; // 显示顺序，默认为'0'
  path: string | null; // 路由地址
  component: string | null; // 组件路径
  query: string | null; // 路由参数
  routeName: string | null; // 路由名称
  isFrame: number | null; // 是否为外链（0是 1否），默认为'1'
  isCache: number | null; // 是否缓存（0缓存 1不缓存），默认为'0'
  menuType: string | null; // 菜单类型（M目录 C菜单 F按钮）
  visible: string | null; // 菜单状态（0显示 1隐藏），默认为'0'
  status: string | null; // 菜单状态（0正常 1停用），默认为'0'
  perms: string | null; // 权限标识
  icon: string | null; // 菜单图标，默认为'#'
}

export type RouteConfig = {
  id: string; // 路由ID
  parentId: string; // 父路由ID
  path: string; // 路由路径
  component: string; // 组件路径
  redirect: string; // 重定向路径
  name: string; // 路由名称
  hidden: boolean; // 是否在菜单隐藏
  layout: string; // 布局
  loader: string; // loader的文件路径
  meta: {
    title: string; // 标题
    icon: string; // 图标
    keepAlive: string; // 是否缓存
    hiddenHeaderContent: string; // 是否隐藏头部内容
    permission: string[]; // 权限
  };
};

// 扩展 MenuItem 类型，添加所需的属性
export type ExtendedMenuItem = MenuItem & {
  key?: React.Key;
  icon?: string | React.ReactNode;
  children?: ExtendedMenuItem[];
  label?: React.ReactNode;
  type?: 'group';
  fullpath?: string;
};
export interface MenuBarProps extends MenuProps {
  autoExpand?: boolean; // 菜单是否自动展开
  menus: ExtendedMenuItem[];
}
