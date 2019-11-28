import React from 'react';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
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
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="Hello Github"
        dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
        // onPressEnter={value => {
        //   console.log('enter', value);
        // }}
      />
      <Avatar />
    </div>
  );
};

export default GlobalHeaderRight;
