import { RootState } from '@/store';
import { logout } from '@/store/appSlice';
import { Avatar, Button, Dropdown, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './navbar.module.scss';
function DropdownRender() {
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(logout())}>退出登录</Button>
    </div>
  );
}

function NavBar() {
  const { userInfo } = useSelector((state: RootState) => state.app);
  return (
    <div className={styles.navbar}>
      <Dropdown popupRender={() => <DropdownRender />}>
        <a onClick={e => e.preventDefault()}>
          <Space>
            <Avatar src={userInfo.avatar} />
            <span className={styles.username}>{userInfo.userName}</span>
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default NavBar;
