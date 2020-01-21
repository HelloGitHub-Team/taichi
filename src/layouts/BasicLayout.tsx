/**
 * Tai Chi v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
} from '@ant-design/pro-layout';
import React from 'react';
import Link from 'umi/link';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import router from 'umi/router';
import { ConnectState } from '@/models/connect';
import logo from '../assets/images/logo.png';
import defaultSettings from '../../config/defaultSettings';
import RightContent from '@/components/GlobalHeader/RightContent';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  dispatch: Dispatch;
}
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => ({ ...item, children: item.children ? menuDataRender(item.children) : [] }));

const footerRender: BasicLayoutProps['footerRender'] = () => (
  <>
    <div
      style={{
        padding: '0px 24px 24px',
        textAlign: 'center',
      }}
    >
      分享 GitHub 上 有趣、入门级的开源项目
    </div>
  </>
);

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, collapsed } = props;
  /**
   * init variables
   */
  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  const onMenuHeaderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push('/');
  };
  return (
    <ProLayout
      logo={logo}
      collapsed={collapsed}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      breakpoint={false}
      footerRender={footerRender}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      onMenuHeaderClick={onMenuHeaderClick}
      {...props}
      {...defaultSettings}
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
}))(BasicLayout);
