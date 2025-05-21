import { RootState } from '@/store';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import SvgIcon from '../SvgIcom/SvgIcon';

// 扩展 MenuItem 类型，添加所需的属性
interface ExtendedMenuItem {
  key?: React.Key;
  icon?: string | React.ReactNode;
  children?: ExtendedMenuItem[];
  label?: React.ReactNode;
  type?: 'group';
  fullpath?: string;
}

type MenuItem = ExtendedMenuItem;

function transformSvgComponent(menus: MenuItem[]) {
  if (!menus || menus.length === 0) return [];
  return menus.map(menu => {
    return {
      ...menu,
      icon: typeof menu.icon === 'string' ? <SvgIcon name={menu.icon} /> : menu.icon,
      children: menu.children ? transformSvgComponent(menu.children) : undefined,
    };
  });
}

/**
 * 递归查找当前路径所在的菜单项，并返回所有父级菜单的key
 * @param menus 菜单列表
 * @param path 当前路径
 * @returns 所有需要展开的菜单key数组
 */
function findOpenKeysByPath(menus: MenuItem[], path: string): string[] {
  const keys: string[] = [];

  // 递归查找匹配的菜单项及其所有父级菜单
  function findKeys(items: MenuItem[], parentKeys: string[] = []): boolean {
    if (!items) return false;

    for (const item of items) {
      if (!item) continue; // 跳过空项

      // 当前项的key
      const currentKey = item.key as string;
      // 构建当前路径的父级keys
      const currentParentKeys = [...parentKeys];
      if (currentKey) {
        currentParentKeys.push(currentKey);
      }

      // 如果找到匹配的菜单项
      if (item.fullpath === path) {
        // 将所有父级key添加到结果中
        keys.push(...parentKeys);
        return true;
      }

      // 如果有子菜单，递归查找
      if (item.children && item.children.length > 0) {
        const found = findKeys(item.children, currentParentKeys);
        if (found) {
          // 如果在子菜单中找到匹配项，将当前级别的key也添加到结果中
          keys.push(...parentKeys);
          return true;
        }
      }
    }

    return false;
  }

  findKeys(menus);
  return [...new Set(keys)]; // 去重
}

const MenuBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menus: MenuItem[] = useSelector((state: RootState) => state.app.menus);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const menuList = useMemo(() => {
    return transformSvgComponent(menus);
  }, [menus]);

  // 路由变化时，自动展开对应的菜单
  useEffect(() => {
    if (menus.length > 0) {
      const currentPath = location.pathname;
      const keysToOpen = findOpenKeysByPath(menus, currentPath);
      if (keysToOpen.length > 0) {
        setOpenKeys(keysToOpen);
      }
    }
  }, [location.pathname, menus]);

  const defaultSelectedKeys = useMemo(() => {
    if (menus && menus.length > 0) {
      return [menus[0]?.key as string];
    }
    return [];
  }, [menus]);

  const findKeysByPath = useCallback((menu: MenuItem, path: string, keys: string[]) => {
    if (menu.fullpath === path) {
      keys.push(menu.key as string);
      return keys;
    }
    if (menu.children) {
      menu.children.forEach(child => {
        findKeysByPath(child, path, keys);
      });
    }
  }, []);

  const currentSelectedKeys = useMemo(() => {
    const currentPath = location.pathname;
    const keys: string[] = [];
    menus.forEach(menu => {
      findKeysByPath(menu, currentPath, keys);
    });
    return keys;
  }, [menus, location, findKeysByPath]);

  const [current, setCurrent] = useState<string[]>(currentSelectedKeys);

  // 路由变化时自动同步菜单选中状态
  useEffect(() => {
    setCurrent(currentSelectedKeys);
  }, [currentSelectedKeys]);

  // 处理菜单点击
  const handleClick: MenuProps['onClick'] = e => {
    // 查找被点击的菜单项
    const findMenuItem = (items: MenuItem[], key: string): MenuItem | null => {
      for (const item of items) {
        if (item.key === key) {
          return item;
        }
        if (item.children) {
          const found = findMenuItem(item.children, key);
          if (found) return found;
        }
      }
      return null;
    };

    const clickedItem = findMenuItem(menus, e.key);
    if (clickedItem && clickedItem.fullpath) {
      navigate(clickedItem.fullpath);
      setCurrent([e.key]);
    }
  };

  // 处理菜单展开/关闭
  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      onClick={handleClick}
      defaultSelectedKeys={defaultSelectedKeys}
      theme="dark"
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      mode="inline"
      selectedKeys={current}
      items={menuList}
    />
  );
};

export default MenuBar;
