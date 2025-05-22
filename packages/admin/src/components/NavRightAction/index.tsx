import { Dropdown, MenuProps } from 'antd';
import { logout } from '@/store/appSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useAppSelector, RootState } from '@/store';
import SvgIcon from '@/components/SvgIcon/SvgIcon';
import Fullscreen from '@/components/NavBar/components/Fullscreen';
import { Space } from 'antd';
import { Avatar } from 'antd';
import styles from '@/components/NavBar/navbar.module.scss';
import DrawerSetting from '@/components/DrawerSetting';

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
function NavRightAction() {
  const { userInfo } = useAppSelector((state: RootState) => state.app);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
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
      <SvgIcon
        onClick={showDrawer}
        name="setting"
        style={{ marginLeft: '15px', cursor: 'pointer' }}
      />
      <DrawerSetting open={open} setOpen={onClose} />
    </div>
  );
}

export default NavRightAction;
