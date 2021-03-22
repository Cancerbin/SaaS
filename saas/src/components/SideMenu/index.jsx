import React from 'react';
import { connect, history } from 'umi';
import { SmileOutlined } from '@ant-design/icons';
import routerJson from '@/utils/router.json';
import styles from './index.less';

class SideMenu extends React.Component {
  // 跳转路由
  linkRouter = (item) => {
    const { dispatch, tabList } = this.props;
    const newTabList = [...tabList];
    const tabIndex = newTabList.findIndex(tab => tab.name && tab.name === 'nav');
    const tabItem = {
      name: 'nav',
      title: '导航页'
    }
    if (tabIndex < 0) {
      newTabList.push(tabItem);
      dispatch({
        type: 'global/updateTabList',
        payload: {
          tabList: newTabList
        }
      })
    }
    // 更新边栏菜单
    dispatch({
      type: 'global/updateSideMenu',
      payload: {
        menu: item.name
      }
    })
    // 更新tab
    dispatch({
      type: 'global/updateTabKey',
      payload: {
        tab: tabItem.name
      }
    }).then(() => {
      history.push({
        pathname: '/nav'
      })
    })
  }

  render() {
    const { sideMenuKey } = this.props;
    return (
      <div className={styles.nav}>
        {routerJson.map(item => (
          <dl key={item.name} className={item.name === sideMenuKey ? styles.active : null} onClick={() => this.linkRouter(item)}>
            <dt><SmileOutlined /></dt>
            <dd>{item.title}</dd>
          </dl>
        ))}
      </div>
    )
  }
}

export default connect(({ global }) => ({
  sideMenuKey: global.sideMenuKey,
  tabList: global.tabList
}))(SideMenu);