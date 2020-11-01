import React from 'react';
import { Icon } from 'antd';
import Link from 'umi/link';
import styles from './index.less';
import defaultSettings from '../../../config/defaultSettings';

const { navTheme: theme, layout } = defaultSettings;
const GlobalHeaderRight: React.FC = () => {
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <div className={className}>
      <Link to="/profile" className={styles.action}>
        <span>
          <Icon type="profile" theme="twoTone" />
          主站个人首页
        </span>
      </Link>
    </div>
  );
};

export default GlobalHeaderRight;
