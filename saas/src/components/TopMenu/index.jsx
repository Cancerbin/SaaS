import React from 'react';
import { connect, history } from 'umi';
import { Tag } from 'antd';

class TopMenu extends React.Component {
  // 切换tab
  changeTab = (item) => {
    const { dispatch } = this.props;
    const pathUrl = `/${item.name.split('.').join('/')}`;
    dispatch({
      type: 'global/updateTabKey',
      payload: {
        tab: item.name
      }
    }).then(() => {
      history.push({
        pathname: pathUrl
      })
    })
  }

  render() {
    const { tabList } = this.props;
    return (
      <div>
        {tabList.map(item => <Tag key={item.name} color="#2db7f5" closable onClick={() => this.changeTab(item)}>{item.title}</Tag>)}
      </div>
    )
  }
}

export default connect(({ global }) => ({
  tabList: global.tabList,
}))(TopMenu);