import NavRightAction from '@/components/NavRightAction';
import { RootState } from '@/store';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCollapsed } from '../../store/appSlice';
import Breadcrumb from '../Breadcrumb';
import styles from './navbar.module.scss';

function NavBar() {
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
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
        <Breadcrumb />
      </div>
      <div className={styles.navbarRight}>
        <NavRightAction />
      </div>
    </div>
  );
}

export default NavBar;
