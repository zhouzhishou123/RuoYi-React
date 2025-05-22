import { RootState } from '@/store';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { setCollapsed } from '../../store/appSlice';
import Breadcrumb from '../Breadcrumb';
import styles from './navbar.module.scss';
import NavRightAction from '@/components/NavRightAction';

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
            width: 64,
            height: 64,
          }}
        />
        <Breadcrumb />
      </div>
      <NavRightAction />
    </div>
  );
}

export default NavBar;
