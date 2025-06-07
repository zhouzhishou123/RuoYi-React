import SideBar from '@/components/SideBar';
import TagsView from '@/components/TagsView';
import { RootState, useAppSelector } from '@/store';
import { findItemByPath, transformSvgComponent } from '@/utils';
import { Layout, theme } from 'antd';
import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from '../baseLayout/base.layout.module.scss';
import NavBar from './NavBar';
const { Header, Content } = Layout;
function SideLayout() {
  const location = useLocation();
  const collapsed = useAppSelector((state: RootState) => state.app.collapsed);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const menusState: MenuItem[] = useAppSelector((state: RootState) => state.app.menus);
  const menuList = useMemo(() => {
    return findItemByPath(transformSvgComponent(menusState), location.pathname);
  }, [location.pathname, menusState]);
  return (
    <Layout>
      <SideBar menus={menuList} />
      <Layout className={`main-layout ${collapsed ? 'collapsed' : ''}`}>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className={collapsed ? 'collapsed' : ''}
        >
          <div className={styles.header}>
            <NavBar />
          </div>
        </Header>
        <TagsView />
        <div className="main-content">
          <Content
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}

export default SideLayout;
