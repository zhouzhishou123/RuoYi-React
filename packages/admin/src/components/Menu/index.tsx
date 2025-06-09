import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExtendedMenuItem, MenuBarProps } from '@/types';

/**
 * 递归查找当前路径所在的菜单项，并返回所有父级菜单的key
 * @param menus 菜单列表
 * @param path 当前路径
 * @returns 所有需要展开的菜单key数组
 */
function findOpenKeysByPath(menus: ExtendedMenuItem[], path: string): string[] {
  const keys: string[] = [];

  // 递归查找匹配的菜单项及其所有父级菜单
  function findKeys(items: ExtendedMenuItem[], parentKeys: string[] = []): boolean {
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

interface MenuBarProps extends MenuProps {
  autoExpand?: boolean; // 菜单是否自动展开
  menus: ExtendedMenuItem[];
}

const MenuBar: React.FC<MenuBarProps> = ({ autoExpand = true, menus, ...rest }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  // 路由变化时，自动展开对应的菜单
  useEffect(() => {
    if (menus.length > 0 && autoExpand) {
      const currentPath = location.pathname;
      const keysToOpen = findOpenKeysByPath(menus, currentPath);
      if (keysToOpen.length > 0) {
        setOpenKeys(keysToOpen);
      }
    }
  }, [location.pathname, menus, autoExpand]);

  const defaultSelectedKeys = useMemo(() => {
    if (menus && menus.length > 0) {
      return [menus[0]?.key as string];
    }
    return [];
  }, [menus]);

  const findKeysByPath = useCallback((menu: ExtendedMenuItem, path: string, keys: string[]) => {
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
    const findMenuItem = (items: ExtendedMenuItem[], key: string): ExtendedMenuItem | null => {
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
    }
  };

  // 处理菜单展开/关闭
  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      {...rest}
      onClick={rest.onClick || handleClick}
      defaultSelectedKeys={rest.defaultSelectedKeys || defaultSelectedKeys}
      openKeys={rest.openKeys || openKeys}
      onOpenChange={rest.onOpenChange || handleOpenChange}
      selectedKeys={rest.selectedKeys || current}
      items={menus as MenuItem[]}
    />
  );
};

export default MenuBar;
