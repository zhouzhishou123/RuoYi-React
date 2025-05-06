import { Dropdown, Space, MenuProps, Avatar, Button } from 'antd';
import styles from './navbar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/appSlice';
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
      <Dropdown dropdownRender={() => <DropdownRender />}>
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
