import React from 'react';
import { connect, history } from 'umi';
import { Form, Button, Space, message, Divider } from 'antd';
import { SearchOutlined, PlusCircleOutlined, CloseCircleOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import UniversalTable from '@/components/UniversalTable';
import UniversalForm from '@/components/UniversalForm';
import UpdateModal from './updateModal';

const FormList = [
  {
    label: '部门编码',
    name: 'branchNo',
    type: 'input'
  },
  {
    label: '部门名称',
    name: 'branchName',
    type: 'input'
  }
]

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

    filterVisible: true,
    filterValues: {}
  }

  componentDidMount() {
    this.queryDepartmentList();
  }

  // 查询
  searchForm = () => {
    this.formRef.current.validateFields()
      .then(values => {
        this.setState({
          filterValues: values,
          departmentTableListPage: 1
        }, () => {
          this.queryDepartmentList();
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  // 获取会员列表
  queryDepartmentList = () => {
    const { dispatch } = this.props;
    const { filterValues, departmentTableListPage, departmentTableListSize } = this.state;
    dispatch({
      type: 'department/queryDepartmentList',
      payload: {
        current: departmentTableListPage,
        size: departmentTableListSize,
        model: {
          ...filterValues
        }
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

  // 新增
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

  // 操控条件显示与隐藏
  controlFilter = () => {
    const { filterVisible } = this.state;
    this.setState({
      filterVisible: !filterVisible
    })
  }

  render() {
    const { loadingList, loadingSave, loadingDelete } = this.props;
    const {
      filterVisible,
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
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
      <div className="main-layout">
        <div className="main-layout-header">
          <Space>
            <Button type="primary" icon={<SearchOutlined />} onClick={this.searchForm}>查询</Button>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={this.addDepartment}>新增</Button>
            <Button type="primary" icon={<CloseCircleOutlined />} onClick={this.closePage}>关闭</Button>
            <Button type="primary" icon={filterVisible ? <UpOutlined /> : <DownOutlined />} onClick={this.controlFilter}>{filterVisible ? '隐藏' : '显示'}查询条件</Button>
          </Space>
          <Divider className="custom-divider" />
          <Form
            ref={this.formRef}
            name="advanced"
            size="middle"
            className="custom-search-form"
            style={{ display: filterVisible ? 'block' : 'none' }}
            {...layout}
          >
            <UniversalForm formList={FormList} />
          </Form>
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