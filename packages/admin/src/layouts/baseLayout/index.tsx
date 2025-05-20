import SideBar from '@/components/SideBar';
import { RootState } from '@/store';
import { setCollapsed } from '@/store/appSlice';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styles from './base.layout.module.scss';
import NavBar from '@/components/NavBar';
import Breadcrumb from '@/components/Breadcrumb';
const { Header, Content } = Layout;

const BaseLayout: React.FC = () => {
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const dispatch = useDispatch();
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
