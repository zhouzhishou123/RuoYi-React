import { RootState } from '@/store';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import SvgIcon from '../SvgIcom/SvgIcon';

type MenuItem = Required<MenuProps>['items'][number];

function transformSvgComponent(menus: MenuItem[]) {
  if (!menus || menus.length === 0) return;
  return menus.map(menu => {
    return {
      ...menu,
      icon: <SvgIcon name={menu.icon} />,
      children: menu.children ? transformSvgComponent(menu.children) : undefined,
    };
  });
}

const MenuBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menus: MenuItem[] = useSelector((state: RootState) => state.app.menus);
  const menuList = useMemo(() => {
    return transformSvgComponent(menus);
  }, [menus]);
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
  // 处理菜单点击
  const handleClick: MenuProps['onClick'] = ({ item, key }) => {
    navigate(item.props.fullpath);
    setCurrent([key]);
  };
  // // 确保有菜单项可渲染
  // if (!menus || menus.length === 0) {
  //   return null;
  // }

  return (
    <Menu
      onClick={handleClick}
      defaultSelectedKeys={defaultSelectedKeys}
      theme="dark"
      mode="inline"
      selectedKeys={current}
      items={menuList}
    />
  );
};

export default MenuBar;
