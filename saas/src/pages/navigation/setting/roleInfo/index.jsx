import React from 'react';
import { connect, history } from 'umi';
import { Form, Button, Space, message, Divider } from 'antd';
import { SearchOutlined, PlusCircleOutlined, CloseCircleOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import UniversalTable from '@/components/UniversalTable';
import UniversalForm from '@/components/UniversalForm';
import UpdateModal from './updateModal';

const FormList = [
  {
    label: '角色编码',
    name: 'code',
    type: 'input'
  },
  {
    label: '角色名称',
    name: 'name',
    type: 'input'
  }
]

class Character extends React.Component {
  formRef = React.createRef();

  state = {
    tableColumns: [
      {
        title: '角色编码',
        dataIndex: 'code',
        width: 180,
        align: 'center'
      },
      {
        title: '角色名称',
        dataIndex: 'name',
        width: 180,
        align: 'center'
      },
      {
        title: '备注',
        dataIndex: 'describe',
        width: 180,
        align: 'center'
      }
    ],
    tableList: [],
    total: 0,
    page: 1,
    size: 10,

    updateModalVisible: false,
    updateType: undefined,
    updateItem: {},

    filterVisible: true,
    filterValues: {},

    roleMemberList: []
  }

  componentDidMount() {
    this.queryCharacterList();
  }

  // 查询
  searchForm = () => {
    this.formRef.current.validateFields()
      .then(values => {
        this.setState({
          filterValues: values,
          page: 1
        }, () => {
          this.queryCharacterList();
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  // 获取角色列表
  queryCharacterList = () => {
    const { dispatch } = this.props;
    const { filterValues, page, size } = this.state;
    dispatch({
      type: 'character/queryCharacterList',
      payload: {
        current: page,
        size: size,
        model: {
          ...filterValues
        }
      }
    }).then(res => {
      if (res && res.code === 0) {
        this.setState({
          tableList: res.data.records,
          page: res.data.pages,
          total: res.data.total
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

  // 绑定事件
  bindEvent = (type, key, record) => {
    switch (type) {
      case 'add':
        this.setState({
          updateType: 'add',
          updateItem: {}
        })
        break;

      case 'save':
        this.saveCharacter(type, key, record);
        break;

      case 'delete':
        this.saveCharacter(type, key, record);
        break;

      case 'close':
        this.closeUpdateModal();
        break;

      default:
        break;
    }
  }

  // 保存信息
  saveCharacter = (type, key, record) => {
    const { dispatch } = this.props;
    const { updateType, updateItem } = this.state;
    let params;
    let requestType;
    if (type === 'save') {
      requestType = `character/${key === 'baseInfo' ? 'updateCharacterInfo' : 'updateMechanismInfo'}`;
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
          console.log(res)
          // message.success({
          //   content: `${updateType === 'add' ? '新增' : '修改'}成功`,
          //   duration: 2
          // })
          // this.setState({
          //   updateType: 'update',
          //   updateItem: res.data
          // }, () => {
          //   this.queryDepartmentList();
          // })
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
      tableColumns,
      tableList,
      page,
      total,
      size,

      // 弹窗模式
      updateModalVisible,
      updateType,
      updateItem,

      roleMemberList
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
            columns={tableColumns}
            dataSource={tableList}
            pageIndex={page}
            pageTotal={total}
            pageSize={size}
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
            roleMemberList={roleMemberList}
          />
        }
      </div>
    )
  }
}

export default connect(({ global, character, loading }) => ({
  loadingList: loading.effects['character/queryCharacterList']
}))(Character);