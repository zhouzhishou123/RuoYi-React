import MenuBar from '@/components/Menu';
import NavBar from '@/layouts/mixLayout/Navbar';
import { RootState } from '@/store';
import { MenuItem } from '@/types';
import { findItemByPath, transformSvgComponent } from '@/utils';
import { Layout } from 'antd';
import { useLayoutEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
const { Header, Content, Sider } = Layout;
function MixLayout() {
  const location = useLocation();
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const menusState: MenuItem[] = useSelector((state: RootState) => state.app.menus);
  const menuList = useMemo(() => {
    return findItemByPath(transformSvgComponent(menusState), location.pathname);
  }, [location.pathname, menusState]);
  // 设置侧边栏宽度的 CSS 变量
  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--sider-width', collapsed ? '80px' : '200px');
  }, [collapsed]);
  return (
    <Layout>
      <Sider collapsed={collapsed}>
        <div className="logo-container">{!collapsed ? 'RuoYi-React Admin' : 'RRA'}</div>
        <MenuBar menus={menuList} mode="vertical" theme="dark" />
      </Sider>
      <Layout>
        <Header>
          <NavBar />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MixLayout;
