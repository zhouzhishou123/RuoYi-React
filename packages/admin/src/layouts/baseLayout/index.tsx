import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import TagsView from '@/components/TagsView';
import { RootState } from '@/store';
import { Layout, theme } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styles from './base.layout.module.scss';
const { Header, Content } = Layout;

const BaseLayout: React.FC = () => {
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className={styles.baseLayout}>
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
    </div>
  );
};

export default BaseLayout;
