import MenuBar from '@/components/Menu';
import NavRightAction from '@/components/NavRightAction';
import { RootState } from '@/store';
import { setCollapsed } from '@/store/appSlice';
import { MenuItem } from '@/types';
import { transformSvgComponent } from '@/utils';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './navbar.module.scss';

function NavBar({ handleMenuClick }: { handleMenuClick: (key: string) => void }) {
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const menusState: MenuItem[] = useSelector((state: RootState) => state.app.menus);
  const menuList = useMemo(() => {
    return transformSvgComponent(menusState).map(item => ({
      fullpath: item.fullpath,
      icon: item.icon,
      key: item.key,
      label: item.label,
      path: item.path,
    }));
  }, [menusState]);
  const dispatch = useDispatch();
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(setCollapsed(!collapsed))}
          style={{
            fontSize: '16px',
          }}
        />
        <MenuBar menus={menuList} mode="horizontal" theme="light" onClick={handleMenuClick} />
      </div>
      <div className={styles.navbarRight}>
        <NavRightAction />
      </div>
    </div>
  );
}

export default NavBar;
