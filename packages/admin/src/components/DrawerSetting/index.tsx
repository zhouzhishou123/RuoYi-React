import { Drawer, Divider, Typography, Switch, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setLayoutMode } from '@/store/appSlice';
import { CheckOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

function DrawerSetting({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const { layoutMode } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const handleLayoutChange = (value: string) => {
    dispatch(setLayoutMode(value));
  };

  return (
    <Drawer
      title="系统设置"
      open={open}
      onClose={() => setOpen(false)}
      width={300}
      styles={{
        body: { padding: 0 },
      }}
    >
      <div className={styles.settingContainer}>
        <Divider style={{ margin: '24px 0 16px 0' }}>
          <Typography.Text strong>导航模式</Typography.Text>
        </Divider>

        <div className={styles.layoutOptionsHorizontal}>
          <div
            className={`${styles.optionItemHorizontal} ${layoutMode === 'side' ? styles.active : ''}`}
            onClick={() => handleLayoutChange('side')}
          >
            <div className={styles.optionContent}>
              <div className={styles.optionBox}>
                <div className={styles.sideMenuPreview}></div>
              </div>
              <div className={styles.optionTitle}>左侧菜单</div>
            </div>
          </div>

          <div
            className={`${styles.optionItemHorizontal} ${layoutMode === 'top' ? styles.active : ''}`}
            onClick={() => handleLayoutChange('top')}
          >
            <div className={styles.optionContent}>
              <div className={styles.optionBox}>
                <div className={styles.topMenuPreview}></div>
              </div>
              <div className={styles.optionTitle}>顶部菜单</div>
            </div>
          </div>

          <div
            className={`${styles.optionItemHorizontal} ${layoutMode === 'mix' ? styles.active : ''}`}
            onClick={() => handleLayoutChange('mix')}
          >
            <div className={styles.optionContent}>
              <div className={styles.optionBox}>
                <div className={styles.mixMenuPreview}></div>
              </div>
              <div className={styles.optionTitle}>混合菜单</div>
            </div>
          </div>
        </div>

        <Divider style={{ margin: '24px 0 16px 0' }}>
          <Typography.Text strong>主题色</Typography.Text>
        </Divider>

        <div className={styles.themeColors} style={{ padding: '0 16px' }}>
          <Tooltip title="薄暮">
            <div
              className={`${styles.colorBlock} ${styles.active}`}
              style={{ backgroundColor: '#f5222d' }}
            >
              <CheckOutlined />
            </div>
          </Tooltip>
          <Tooltip title="火山">
            <div className={styles.colorBlock} style={{ backgroundColor: '#fa541c' }}></div>
          </Tooltip>
          <Tooltip title="日暮">
            <div className={styles.colorBlock} style={{ backgroundColor: '#fa8c16' }}></div>
          </Tooltip>
          <Tooltip title="金盏花">
            <div className={styles.colorBlock} style={{ backgroundColor: '#faad14' }}></div>
          </Tooltip>
          <Tooltip title="青柠">
            <div className={styles.colorBlock} style={{ backgroundColor: '#a0d911' }}></div>
          </Tooltip>
          <Tooltip title="极光绿">
            <div className={styles.colorBlock} style={{ backgroundColor: '#52c41a' }}></div>
          </Tooltip>
          <Tooltip title="明青">
            <div className={styles.colorBlock} style={{ backgroundColor: '#13c2c2' }}></div>
          </Tooltip>
          <Tooltip title="拂晓蓝">
            <div className={styles.colorBlock} style={{ backgroundColor: '#1890ff' }}></div>
          </Tooltip>
          <Tooltip title="极客蓝">
            <div className={styles.colorBlock} style={{ backgroundColor: '#2f54eb' }}></div>
          </Tooltip>
          <Tooltip title="酱紫">
            <div className={styles.colorBlock} style={{ backgroundColor: '#722ed1' }}></div>
          </Tooltip>
        </div>

        <Divider style={{ margin: '24px 0 16px 0' }}>
          <Typography.Text strong>其他设置</Typography.Text>
        </Divider>

        <div className={styles.otherSettings} style={{ padding: '0 16px' }}>
          <div className={styles.settingItem}>
            <span>固定头部</span>
            <Switch size="small" defaultChecked />
          </div>
          <div className={styles.settingItem}>
            <span>固定侧边栏</span>
            <Switch size="small" defaultChecked />
          </div>
          <div className={styles.settingItem}>
            <span>固定标签页</span>
            <Switch size="small" defaultChecked />
          </div>
          <div className={styles.settingItem}>
            <span>流式布局</span>
            <Switch size="small" />
          </div>
          <div className={styles.settingItem}>
            <span>色弱模式</span>
            <Switch size="small" />
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default DrawerSetting;
