import React from 'react';
import { connect, history } from 'umi';
import { Badge } from 'antd';
import styles from './index.less';

class TopMenu extends React.Component {
  // 切换tab
  changeTab = (item) => {
    const { tabKey } = this.props;
    if (tabKey !== item.path) {
      history.push({
        pathname: item.path
      })
    }
  }

  closeTab = (e, item) => {
    e.stopPropagation();
    console.log(item)
  }

  render() {
    const { tabList, tabKey } = this.props;
    return (
      <div className={styles.tabLayout}>
        {tabList.map(item => (
          <div className={styles.tab} key={item.path} onClick={() => this.changeTab(item)}>
            <Badge color={tabKey === item.path ? '#09f' : '#ddd'} text={item.name} /> <span onClick={(e) => this.closeTab(e, item)}>X</span>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(({ global }) => ({
  tabList: global.tabList,
  tabKey: global.tabKey
}))(TopMenu);