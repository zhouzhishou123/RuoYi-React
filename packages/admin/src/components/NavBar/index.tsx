import { RootState } from '@/store';
import { logout } from '@/store/appSlice';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCollapsed } from '../../store/appSlice';
import Breadcrumb from '../Breadcrumb';
import Fullscreen from './components/Fullscreen';
import styles from './navbar.module.scss';
function Logout() {
  const dispatch = useDispatch();
  return <span onClick={() => dispatch(logout())}>退出登录</span>;
}

const items: MenuProps['items'] = [
  {
    key: 'logout',
    label: <Logout />,
  },
];

function NavBar() {
  const { userInfo } = useSelector((state: RootState) => state.app);
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
      <div className={styles.navbarRight}>
        <Fullscreen />
        <Dropdown menu={{ items }}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              <Avatar src={userInfo.avatar} />
              <span className={styles.username}>{userInfo.userName}</span>
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}

export default NavBar;
