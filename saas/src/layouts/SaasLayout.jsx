import React from 'react';
import { connect, history } from 'umi';
import { SmileOutlined } from '@ant-design/icons';
import NavTab from '@/components/NavTab';
import styles from './saas.less';

class SaasLayout extends React.Component {
  componentDidMount() {
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

  // 保存tab页
  saveTabList = (arr) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/updateTabList',
      payload: {
        tabList: arr
      }
    })
  }

  render() {
    const { children, route, location } = this.props;
    const routerList = route.children[0].routes;
    console.log(children)
    return (
      <div className={styles.wrapper}>
        {/* 顶部信息栏 */}
        <div className={styles.header}></div>
        {/* 主体 */}
        <div className={styles.main}>
          {/* 导航栏 */}
          <div className={styles.nav}>
            {routerList.map(item => (
              <dl key={item.name} className={location.pathname.indexOf(item.path) < 0 ? null : styles.active} onClick={() => this.linkRouter(item)}>
                <dt><SmileOutlined /></dt>
                <dd>{item.title}</dd>
              </dl>
            ))}
          </div>
          {/* 内容区 */}
          <div className={styles.content}>
            <div className={styles.menus}>
              <NavTab location={location} />
            </div>
            <div className={styles.details}>
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ global }) => ({
  tabList: global.tabList,
}))(SaasLayout);
