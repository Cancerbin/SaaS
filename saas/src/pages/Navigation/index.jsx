import React from 'react';
import { connect, history } from 'umi';
import { Card } from 'antd';
import { DesktopOutlined } from '@ant-design/icons';
import routerJson from '@/utils/router.json';
import styles from './index.less';


class Navigation extends React.Component {
  state = {}

  componentDidMount() { }

  // 跳转路由
  linkRouter = (item) => {
    const { dispatch, tabList } = this.props;
    const newTabList = [...tabList];
    const tabIndex = newTabList.findIndex(tab => tab.name && tab.name === item.name);
    const tabItem = {
      name: item.name,
      title: item.title,
      component: item.component
    }
    // 判断是否存在该Tab
    if (tabIndex < 0) {
      newTabList.push(tabItem);
      dispatch({
        type: 'global/updateTabList',
        payload: {
          tabList: newTabList
        }
      })
    }
    dispatch({
      type: 'global/updateTabKey',
      payload: {
        tab: item.name
      }
    }).then(() => {
      history.push({
        pathname: item.path
      })
    })
  }

  render() {
    const { sideMenuKey } = this.props;
    const menuList = routerJson.filter(item => item.name === sideMenuKey);
    const subMenuList = menuList[0].children;
    return (
      <>
        <Card>
          {subMenuList.map(item => (
            <dl className={styles.menuColumn}>
              <dt><DesktopOutlined /></dt>
              <dd>
                <div className={styles.title}>{item.title}</div>
                <ul>
                  {item.children.map(child => <li key={child.name} onClick={() => this.linkRouter(child)}><a>{child.title}</a></li>)}
                </ul>
              </dd>
            </dl>
          ))}
        </Card>
      </>
    )
  }
}

export default connect(({ global }) => ({
  sideMenuKey: global.sideMenuKey,
  tabList: global.tabList,
}))(Navigation);