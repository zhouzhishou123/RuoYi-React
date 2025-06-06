import MenuBar from '@/components/Menu';
import NavRightAction from '@/components/NavRightAction';
import { RootState } from '@/store';
import { MenuItem } from '@/types';
import { transformSvgComponent } from '@/utils';
import { Layout } from 'antd';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styles from './top.layout.module.scss';
const { Header, Content } = Layout;
function TopLayout() {
  const menusState: MenuItem[] = useSelector((state: RootState) => state.app.menus);
  const menuList = useMemo(() => {
    return transformSvgComponent(menusState);
  }, [menusState]);
  return (
    <Layout>
      <Header>
        <div className={styles.navbar}>
          <div className={styles.navbarLeft}>
            <span>RuoYi-React Admin</span>
          </div>
          <MenuBar theme="dark" className={styles.navbarMenu} menus={menuList} mode="horizontal" />
          <div className={styles.navbarRight}>
            <NavRightAction />
          </div>
        </div>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default TopLayout;
