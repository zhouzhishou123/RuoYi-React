import { RootState } from '@/store';
import React from 'react';
import styles from './base.layout.module.scss';
import SideLayout from '../sideLayout';
import MixLayout from '../mixLayout';
import TopLayout from '../topLayout';
import { useAppSelector } from '@/store';

const BaseLayout: React.FC = () => {
  const layoutMode = useAppSelector((state: RootState) => state.app.layoutMode);

  if (layoutMode === 'side') {
    return (
      <div className={styles.baseLayout}>
        <SideLayout />
      </div>
    );
  } else if (layoutMode === 'top') {
    return (
      <div>
        <TopLayout />
      </div>
    );
  } else if (layoutMode === 'mix') {
    return (
      <div className={styles.baseLayout}>
        <MixLayout />
      </div>
    );
  }
};

export default BaseLayout;
