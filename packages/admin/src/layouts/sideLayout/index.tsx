import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import TagsView from '@/components/TagsView';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from '../baseLayout/base.layout.module.scss';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
const { Header, Content } = Layout;
function SideLayout() {
  const collapsed = useAppSelector((state: RootState) => state.app.collapsed);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <SideBar />
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
