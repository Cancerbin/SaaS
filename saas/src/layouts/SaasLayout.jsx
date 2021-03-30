import React from 'react';
import { connect, history } from 'umi';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import AsyncComponent from '@/components/AsyncComponent';
import SideMenu from '@/components/SideMenu';
import TopMenu from '@/components/TopMenu';
import routerJson from '@/utils/router.json';
import Logo from '@/assets/logo.png'
import styles from './saas.less';

class SaasLayout extends React.Component {
  state = {
    tabLayout: []
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // 初始化SideMenu
    dispatch({
      type: 'global/updateSideMenu',
      payload: {
        menu: sessionStorage.getItem('sideMenuKey') || null
      }
    })
    // 初始化tab表
    this.updateTabList(JSON.parse(sessionStorage.getItem('tabList') || '[]'));
    // 初始化TabKey
    this.updateTabKey(sessionStorage.getItem('tabKey') || null);
    // 监听路由变化
    history.listen((location, action) => {
      const tabList = JSON.parse(sessionStorage.getItem('tabList') || '[]');
      // 获取当前tab
      const currentPath = location.pathname;
      if (currentPath !== '/') {
        const currentPathNameArray = currentPath.slice(1, currentPath.length).split('/');
        const currentPathName = currentPathNameArray.join('.');
        const currentTabArray = tabList.filter(item => item.name === currentPathName);
        // 判断tabList中是否包含当前tab
        if (currentTabArray.length === 0) {
          const newTabList = [...tabList];
          const parentRouterArray = routerJson.filter(item => item.name === currentPathNameArray[0]);
          if (currentPathNameArray.length === 1) {
            const routerItem = {};
            if (currentPath === '/nav') {
              routerItem.name = 'nav';
              routerItem.title = '导航页';
            }
            newTabList.unshift(routerItem);
          } else if (currentPathNameArray.length === 3) {
            const middleRouterArray = parentRouterArray[0].children.filter(item => item.name === `${currentPathNameArray[0]}.${currentPathNameArray[1]}`);
            const childRouterArray = middleRouterArray[0].children.filter(item => item.name === currentPathName);
            newTabList.push(childRouterArray[0]);
          }
          this.updateTabList(newTabList);
        }
        this.updateTabKey(currentPathName);
      }
    });
  }

  // 更新tabList
  updateTabList = (arr) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/updateTabList',
      payload: {
        tabList: arr
      }
    })
  }

  // 更新tabKey
  updateTabKey = (tab) => {
    const { dispatch } = this.props;
    dispatch({
      type: "global/updateTabKey",
      payload: {
        tab: tab
      }
    })
  }

  formateTab = () => {
    const { tabList, route } = this.props;
    const itit = this.digui(route.routes);
    const tempJson = [];
    tabList.forEach(item => {
      tempJson.push(itit.filter(x => x.name === item.name)[0])
    })
    this.setState({
      tabLayout: tempJson
    })
  }

  // 用户操作
  userOperate = ({ key }) => {
    const { dispatch } = this.props;
    if (key === "logout") {
      dispatch({
        type: "login/logout",
        payload: {}
      })
    }
  }

  render() {
    const { tabList, tabKey } = this.props;
    const userName = sessionStorage.getItem('account');
    const menu = (
      <Menu onClick={this.userOperate}>
        <Menu.Item key="logout"><LogoutOutlined /> 退出登录</Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.wrapper}>
        {/* 顶部信息栏 */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={Logo} alt="logo" />
          </div>
          <div className={styles.account}>
            <Dropdown overlay={menu}><a>{userName} <DownOutlined /></a></Dropdown>
          </div>
        </div>
        {/* 主体 */}
        <div className={styles.main}>
          {/* 导航栏 */}
          <div className={styles.nav}>
            <SideMenu />
          </div>
          {/* 内容区 */}
          <div className={styles.content}>
            <div className={styles.menus}>
              <TopMenu />
            </div>
            <div className={styles.details}>
              {tabList.map(item => (
                <div className={`${styles.tabLayout} ${item.name === tabKey ? styles.active : null}`} key={item.name}>{<AsyncComponent {...item} />}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ global, login }) => ({
  tabList: global.tabList,
  tabKey: global.tabKey
}))(SaasLayout);
