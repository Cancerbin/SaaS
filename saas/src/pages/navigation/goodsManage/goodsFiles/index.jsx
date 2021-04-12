import React from 'react';
import { connect } from 'umi';
import { Table } from 'antd';

class CommodityArchive extends React.Component {
  state = {
    archiveTableColumns: [
      {
        title: '货号',
        dataIndex: 'itemNo'
      },
      {
        title: '商品名称',
        dataIndex: 'itemName'
      },
      {
        title: '类别',
        dataIndex: 'itemClsName'
      }
    ],
    archiveTableList: []
  }

  componentDidMount() {
    this.queryArchiveList();
  }

  // 获取商品档案列表
  queryArchiveList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodity/queryCommodityArchiveList',
      payload: {
        model: {}
      }
    }).then(res => {
      if (res && res.code === 0) {
        this.setState({
          archiveTableList: res.data.records
        })
      }
    })
  }

  clickEvent = (record) => {
    console.log(record)
    this.queryArchiveList();
  }

  render() {
    const { loadingList } = this.props;
    const { archiveTableColumns, archiveTableList } = this.state;
    return (
      <>
        <Table
          size="small"
          columns={archiveTableColumns}
          dataSource={archiveTableList}
          rowKey="itemNo"
          onRow={record => {
            return {
              onDoubleClick: event => this.clickEvent(record)
            };
          }}
          loading={!!loadingList}
        />
      </>
    )
  }
}

export default connect(({ commodity, loading }) => ({
  loadingList: loading.effects['commodity/queryCommodityArchiveList']
}))(CommodityArchive);