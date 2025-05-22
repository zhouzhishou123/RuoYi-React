import { Layout } from 'antd';
import NavRightAction from '@/components/NavRightAction';
import { Outlet } from 'react-router-dom';
import styles from './top.layout.module.scss';
const { Header, Content } = Layout;
function TopLayout() {
  return (
    <Layout>
      <Header style={{ background: '#fff' }}>
        <div className={styles.navbarRight}>
          <NavRightAction />
        </div>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default TopLayout;
