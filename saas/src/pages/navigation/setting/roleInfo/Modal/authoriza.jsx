import React from 'react';
import { Table, Checkbox } from 'antd';

class Authoriza extends React.Component {
  state = {
    tableColumnsList: [
      {
        title: '全选',
        dataIndex: 'id',
      },
      {
        title: '浏览',
        dataIndex: 'viewResource',
      },
      {
        title: '新增',
        dataIndex: 'addResource',
      },
      {
        title: '修改',
        dataIndex: 'editResource',
      },
      {
        title: '删除',
        dataIndex: 'deleteResource',
      },
      {
        title: '审核',
        dataIndex: 'auditResource',
      },
      {
        title: '输入',
        dataIndex: 'inputResource',
      },
      {
        title: '导出',
        dataIndex: 'exportResource',
      },
      {
        title: '打印',
        dataIndex: 'printResource',
      },
      {
        title: '设置',
        dataIndex: 'setResource',
      },
      {
        title: '其它',
        dataIndex: 'otherResource',
      },
      {
        title: '无效',
        dataIndex: 'invalidResource',
      },
    ],
    tableColumns: []
  }

  componentDidMount() {
    const { tableColumnsList } = this.state;
    const tableColumns = [];
    tableColumnsList.forEach(item => {
      if (item.dataIndex === 'id') {
        tableColumns.push({
          ...item,
          title: () => {
            return (
              <Checkbox onChange={e => this.props.changeItem('all', e, 'all', 'all')}>全选</Checkbox>
            )
          },
          render: (text, record, index) => {
            const field = item.dataIndex;
            return (
              <><Checkbox checked={record.status === 1} onChange={e => this.props.changeItem('single', e, field, record)}>{record.label}</Checkbox></>
            )
          }
        })
      } else {
        tableColumns.push({
          ...item,
          width: 60,
          align: 'center',
          render: (text, record, index) => {
            const field = item.dataIndex;
            return (
              <>
                {record[field].status === 2 && '-'}
                {record[field].status !== 2 &&
                  <Checkbox checked={record[field].status === 1} disabled={record.viewResource.status === 0 && field !== 'viewResource'} onChange={e => this.props.changeItem('single', e, field, record)}></Checkbox>
                }
              </>
            )
          }
        })
      }
    })
    this.setState({
      tableColumns
    })
  }

  render() {
    const { list = [] } = this.props;
    const { tableColumns } = this.state;
    const heigth = document.body.clientHeight - 500;

    return (
      <Table
        size="small"
        columns={tableColumns}
        dataSource={list}
        rowKey="id"
        pagination={false}
        scroll={{ y: heigth }}
      />
    )
  }
}
export default Authoriza;