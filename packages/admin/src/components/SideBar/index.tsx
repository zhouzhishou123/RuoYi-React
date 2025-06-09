import Menu from '@/components/Menu';
import { MenuItem } from '@/types';
import { RootState } from '@/store';
import { transformSvgComponent } from '@/utils';
import { Layout } from 'antd';
import { useLayoutEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MenuBarProps } from '@/types';
const { Sider } = Layout;
function SideBar(props: MenuBarProps) {
  const { menus, ...rest } = props;
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const menusState: MenuItem[] = useSelector((state: RootState) => state.app.menus);
  const menuList = useMemo(() => {
    return transformSvgComponent(menusState);
  }, [menusState]);
  // 设置侧边栏宽度的 CSS 变量
  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--sider-width', collapsed ? '80px' : '200px');
  }, [collapsed]);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo-container">{!collapsed ? 'RuoYi-React Admin' : 'RRA'}</div>
      <Menu menus={menus || menuList} {...rest} mode="inline" />
    </Sider>
  );
}

export default SideBar;
