import React from 'react';
import { connect, history } from 'umi';
import { SmileOutlined } from '@ant-design/icons';
import styles from './index.less';

class SideMenu extends React.Component {
  // 跳转路由
  linkRouter = (item) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/updateSideMenu',
      payload: {
        menu: item.path
      }
    }).then(() => {
      history.push({
        pathname: '/nav'
      })
    })
  }

  render() {
    const { sideMenuKey } = this.props;
    const router = JSON.parse(sessionStorage.getItem("router") || '[]');
    return (
      <div className={styles.nav}>
        {router.map(item => (
          <dl key={item.path} className={item.path === sideMenuKey ? styles.active : null} onClick={() => this.linkRouter(item)}>
            <dt><SmileOutlined /></dt>
            <dd>{item.name}</dd>
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