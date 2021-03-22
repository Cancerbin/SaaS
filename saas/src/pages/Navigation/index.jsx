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
  linkRouter = (params) => {
    const { dispatch, tabList } = this.props;
    const tempList = [...tabList];
    const index = tempList.findIndex(item => item.name && item.name === params.name);
    const tempTabItem = {
      name: params.name,
      path: params.path,
      title: params.title,
    };
    if (index < 0) {
      tempList.push(tempTabItem)
      dispatch({
        type: 'global/updateTabList',
        payload: {
          tabList: tempList
        }
      })
    }
    history.push({
      pathname: params.path
    })
  }

  render() {
    const { sideMenuKey } = this.props;
    const menuList = routerJson.filter(item => item.name === sideMenuKey);
    return (
      <>
        <Card>
          {menuList.map(item => (
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