import React from 'react';
import { connect, history } from 'umi';
import { Card } from 'antd';
import { DesktopOutlined } from '@ant-design/icons';
// import routerJson from '@/utils/router.json';
import styles from './index.less';


class Navigation extends React.Component {
  state = {}

  componentDidMount() { }

  // 跳转路由
  linkRouter = (item) => {
    const pathUrl = `/${item.name.split('.').join('/')}`;
    history.push({
      pathname: item.path
    })
  }

  render() {
    const { sideMenuKey } = this.props;
    const router = JSON.parse(sessionStorage.getItem("router") || '[]');
    const menuList = router.filter(item => item.path === sideMenuKey);
    const subMenuList = menuList[0].children;
    return (
      <>
        <Card>
          {subMenuList.map(item => (
            <dl className={styles.menuColumn} key={item.sortValue}>
              <dt><DesktopOutlined /></dt>
              <dd>
                <div className={styles.title}>{item.name}</div>
                <ul>
                  {item.children.map(child => <li key={child.path} onClick={() => this.linkRouter(child)}><a>{child.name}</a></li>)}
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