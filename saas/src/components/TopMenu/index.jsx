import React from 'react';
import { connect, history } from 'umi';
import { Tag } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import routerJson from '@/utils/router.json';

class TopMenu extends React.Component {
  // 跳转路由
  linkRouter = (item) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/updateSideMenu',
      payload: {
        menu: item.name
      }
    }).then(() => {
      history.push({
        pathname: '/nav'
      })
    })
  }

  render() {
    const { tabList } = this.props;
    return (
      <div>
        {tabList.map(item => <Tag key={item.name} color="#2db7f5" closable>{item.title}</Tag>)}
      </div>
    )
  }
}

export default connect(({ global }) => ({
  tabList: global.tabList,
}))(TopMenu);