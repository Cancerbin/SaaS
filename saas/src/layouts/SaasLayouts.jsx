import React from 'react';
import { connect, history } from 'umi';
import AsyncComponent from '@/components/AsyncComponent';
import SideMenu from '@/components/SideMenu';
import TopMenu from '@/components/TopMenu';
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
    // 初始化TabKey
    dispatch({
      type: 'global/updateTabKey',
      payload: {
        menu: sessionStorage.getItem('tabKey') || null
      }
    })
    // 初始化tab表
    this.saveTabList(JSON.parse(sessionStorage.getItem('tabList') || '[]'));
  }

  // 跳转路由
  linkRouter = (params) => {
    const { location } = this.props;
    if (params.path === location.pathname) return;
    const { tabList } = this.props;
    const tempList = [...tabList];
    const index = tempList.findIndex(item => item.path && item.path.split('/').length === 2);
    const tempTabItem = {
      name: params.name,
      path: params.path,
      title: params.title
    };
    if (index < 0) {
      tempList.unshift(tempTabItem);
    } else {
      tempList[0] = tempTabItem;
    }
    this.saveTabList(tempList);
    history.replace({
      pathname: params.path,
      state: {
        type: params.type
      }
    })
  }


  digui = (arr) => {
    const tempArray = [];
    arr.forEach(item => {
      tempArray.push(item);
      if (item.routes) {
        const tempa = this.digui(item.routes);
        tempa.forEach(i => {
          tempArray.push(i)
        })
      }
    })
    return tempArray;
  }

  // 保存tab页
  saveTabList = (arr) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/updateTabList',
      payload: {
        tabList: arr
      }
    }).then(res => {
      this.formateTab();
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

  render() {
    const { children, tabList, tabKey } = this.props;
    return (
      <div className={styles.wrapper}>
        {/* 顶部信息栏 */}
        <div className={styles.header}></div>
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
                <div className={`${styles.tabLayout} ${item.name === tabKey ? styles.active : null}`}>{item.component ? <AsyncComponent {...item} /> : <>{children}</>}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ global }) => ({
  tabList: global.tabList,
  tabKey: global.tabKey
}))(SaasLayout);
