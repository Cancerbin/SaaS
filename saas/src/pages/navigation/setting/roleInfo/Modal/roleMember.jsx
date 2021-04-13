import React from 'react';
import { connect } from 'umi';
import { Table } from 'antd';

class RoleMember extends React.Component {
  state = {
    tableColumns: [
      {
        title: '账号',
        dataIndex: 'account',
        align: 'center'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        align: 'center'
      },
      {
        title: '状态',
        dataIndex: 'state',
        align: 'center'
      },
      {
        title: '所属机构',
        dataIndex: 'org',
        align: 'center'
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        align: 'center'
      }
    ],
    tableList: []
  }

  componentDidMount() {
    this.queryRoleMemberList();
  }

  // 获取角色成员列表
  queryRoleMemberList = () => {
    const { dispatch, id } = this.props;
    if (id) {
      dispatch({
        type: 'character/queryRoleMemberList',
        payload: {
          id: id
        }
      }).then(res => {
        if (res && res.code === 0) {
          this.setState({
            tableList: res.data.userList
          })
        }
      })
    }
  }

  render() {
    const { loadingList } = this.props;
    const { tableColumns, tableList } = this.state;
    return (
      <Table
        size="small"
        bordered
        columns={tableColumns}
        dataSource={tableList}
        pagination={{
          hideOnSinglePage: true
        }}
        rowKey="id"
        loading={!!loadingList}
      />
    )
  }
}

export default connect(({ character, loading }) => ({
  loadingList: loading.effects['character/queryRoleMemberList']
}))(RoleMember);