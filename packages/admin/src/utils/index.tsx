import SvgIcon from '@/components/SvgIcon/SvgIcon';
import { MenuItem } from '@/types';

export function transformSvgComponent(menus: MenuItem[]) {
  if (!menus || menus.length === 0) return [];
  return menus.map(menu => {
    return {
      ...menu,
      icon: typeof menu.icon === 'string' ? <SvgIcon name={menu.icon} /> : menu.icon,
      children: menu.children ? transformSvgComponent(menu.children) : undefined,
    };
  });
}

export function findItemByPath(
  menus: MenuItem[],
  path: string,
  parent: MenuItem = null,
): MenuItem | null {
  if (!menus || menus.length === 0) return [];
  for (const menu of menus) {
    if (menu.fullpath === path) {
      if (menu.children) {
        return menu.children;
      }
      return parent ? parent.children : [menu];
    }
    if (menu.children) {
      parent = menu;
      return findItemByPath(menu.children, path, parent);
    }
  }
}
