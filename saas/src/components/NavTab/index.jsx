import React from 'react';
import { connect, history } from 'umi';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class NavTab extends React.Component {
  // 跳转路由
  linkRouter = (path) => {
    history.push({
      pathname: path
    })
  }

  render() {
    const { tabList, location } = this.props;
    return (
      <Tabs activeKey={location.pathname} onChange={this.linkRouter}>
        {tabList.map(item => (
          <TabPane tab={item.title} key={item.path}></TabPane>
        ))}
      </Tabs>
    )
  }
}

export default connect(({ global }) => ({
  tabList: global.tabList,
}))(NavTab);

