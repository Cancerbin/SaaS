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
    const pathUrl = `/${item.name.split('.').join('/')}`;
    history.push({
      pathname: pathUrl
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
            <dl className={styles.menuColumn} key={item.name}>
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