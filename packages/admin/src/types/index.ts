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
