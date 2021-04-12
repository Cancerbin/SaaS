import React from 'react';
import { connect, history } from 'umi';
import { Button, Space, message } from 'antd';
import { SearchOutlined, PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import UniversalTable from '@/components/UniversalTable';
import UpdateModal from './updateModal';

class Department extends React.Component {
  formRef = React.createRef();

  state = {
    departmentTableColumns: [
      {
        title: '部门编码',
        dataIndex: 'branchNo',
        width: 180,
        align: 'center'
      },
      {
        title: '部门名称',
        dataIndex: 'branchName',
        width: 180,
        align: 'center'
      }
    ],
    departmentTableList: [],
    departmentTableListTotal: 0,
    departmentTableListPage: 1,
    departmentTableListSize: 10,

    updateModalVisible: false,
    updateType: undefined,
    updateItem: {},
  }

  componentDidMount() {
    this.queryDepartmentList();
  }

  // 获取会员列表
  queryDepartmentList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'department/queryDepartmentList',
      payload: {
        model: {}
      }
    }).then(res => {
      if (res && res.code === 0) {
        this.setState({
          departmentTableList: res.data.records,
          departmentTableListPage: res.data.pages,
          departmentTableListTotal: res.data.total
        })
      }
    })
  }

  addDepartment = () => {
    this.setState({
      updateModalVisible: true,
      updateType: 'add',
      updateItem: {}
    })
  }

  // 双击事件
  dbClick = (e, record) => {
    this.setState({
      updateModalVisible: true,
      updateType: 'update',
      updateItem: record
    })
  }

  // 关闭弹窗
  closeUpdateModal = () => {
    this.setState({
      updateModalVisible: false,
      updateType: undefined,
      updateItem: {}
    })
  }

  // 保存信息
  saveDepartment = (type, record) => {
    const { dispatch } = this.props;
    const { updateType, updateItem } = this.state;
    let params;
    let requestType;
    if (type === 'save') {
      requestType = `department/${updateType === 'add' ? 'addMechanismInfo' : 'updateMechanismInfo'}`;
      params = {
        ...updateItem,
        ...record
      }
      if (updateType === 'add') {
        params.type = {
          key: "02"
        };
        params.label = record.branchName;
      }
    } else {
      requestType = 'department/deleteMechanismInfo';
      params = {
        ids: updateItem.id
      }
    }

    dispatch({
      type: requestType,
      payload: params
    }).then(res => {
      if (res && res.code === 0) {
        if (type === 'save') {
          message.success({
            content: `${updateType === 'add' ? '新增' : '修改'}成功`,
            duration: 2
          })
          this.setState({
            updateType: 'update',
            updateItem: res.data
          }, () => {
            this.queryDepartmentList();
          })
        } else {
          message.success({
            content: '删除成功',
            duration: 2
          })
          this.setState({
            updateModalVisible: false,
            updateType: undefined,
            updateItem: {}
          }, () => {
            this.queryDepartmentList();
          })
        }
      }
    })
  }

  // 绑定事件
  bindEvent = (type, record) => {
    switch (type) {
      case 'add':
        this.setState({
          updateType: 'add',
          updateItem: {}
        })
        break;

      case 'save':
        this.saveDepartment(type, record)
        break;

      case 'delete':
        this.saveDepartment(type, record);
        break;

      case 'close':
        this.closeUpdateModal();
        break;

      default:
        break;
    }
  }

  // 关闭页面
  closePage = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/deleteTabKey',
      payload: {
        path: history.location.pathname
      }
    })
  }

  render() {
    const { loadingList, loadingSave, loadingDelete } = this.props;
    const {
      // 表格数据
      departmentTableColumns,
      departmentTableList,
      departmentTableListPage,
      departmentTableListTotal,
      departmentTableListSize,

      // 弹窗模式
      updateModalVisible,
      updateType,
      updateItem
    } = this.state;
    return (
      <div className="main-layout">
        <div className="main-layout-header">
          <Space>
            <Button type="primary" icon={<SearchOutlined />} onClick={this.queryDepartmentList}>查询</Button>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={this.addDepartment}>新增</Button>
            <Button type="primary" icon={<CloseCircleOutlined />} onClick={this.closePage}>关闭</Button>
          </Space>
        </div>
        <div className="main-layout-content">
          <UniversalTable
            columns={departmentTableColumns}
            dataSource={departmentTableList}
            pageIndex={departmentTableListPage}
            pageTotal={departmentTableListTotal}
            pageSize={departmentTableListSize}
            onChangeRow={this.changeItem}
            dbClick={this.dbClick}
            loading={!!loadingList}
          />
        </div>

        {updateModalVisible &&
          <UpdateModal
            type={updateType}
            detail={updateItem}
            loadingSave={loadingSave}
            loadingDelete={loadingDelete}
            bindEvent={this.bindEvent}
          />
        }
      </div>
    )
  }
}

export default connect(({ global, department, loading }) => ({
  loadingList: loading.effects['department/queryDepartmentList'],
  loadingSave: loading.effects['department/addMechanismInfo'] || loading.effects['department/updateMechanismInfo'],
  loadingDelete: loading.effects['department/deleteMechanismInfo'],
}))(Department);