import { RootState } from '@/store';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Menu from './Menu';
const { Sider } = Layout;
function SideBar() {
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  // 设置侧边栏宽度的 CSS 变量
  useEffect(() => {
    document.documentElement.style.setProperty('--sider-width', collapsed ? '80px' : '200px');
  }, [collapsed]);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo-container">{!collapsed ? 'Ice-Frog Admin' : 'IF'}</div>
      <Menu />
    </Sider>
  );
}

export default SideBar;
