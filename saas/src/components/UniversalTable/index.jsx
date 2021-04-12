import React from 'react';
import { Table, Pagination } from 'antd';
import styles from './index.less'

class UniversalTable extends React.Component {
  render() {
    const {
      columns = [],  // 表头
      bordered = true,  // 边框
      dataSource = [],  // 数据源
      loading = false,  // 加载动画
      pageIndex = 1,
      pageTotal = 0,
      pageSize = 10,
      rowKey = "id",
      // 选择
      rowSelection = false,
      selectedRowKeys = [],
      onChangeRow,
      // 事件
      dbClick = false
    } = this.props;
    return (
      <>
        <div className={styles.UniversalTable}>
          <div className={styles.content}>
            <Table
              size="small"
              bordered={bordered}
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              loading={loading}
              onRow={record => {
                return {
                  onDoubleClick: (e) => dbClick && dbClick(e, record),
                };
              }}
              rowSelection={rowSelection ? {
                type: "checkbox",
                selectedRowKeys: selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => onChangeRow(selectedRowKeys, selectedRows)
              } : false}
              rowKey={rowKey}
            />
          </div>
        </div>
        <div className={styles.Pagination}>
          <Pagination size="small" current={pageIndex} total={pageTotal} pageSize={pageSize} showSizeChanger={pageTotal > pageIndex * pageSize} pageSizeOptions={[10, 20, 50, 100]} />
        </div>
      </>
    )
  }
}

export default UniversalTable;