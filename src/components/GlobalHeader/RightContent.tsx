import React from 'react';
import { Icon } from 'antd';
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
      <a
        target="_blank"
        href="https://hellogithub.com/profile/"
        rel="noopener noreferrer"
        className={styles.action}
      >
        <span>
          <Icon type="profile" theme="twoTone" />
          主站个人首页
        </span>
      </a>
    </div>
  );
};

export default GlobalHeaderRight;
