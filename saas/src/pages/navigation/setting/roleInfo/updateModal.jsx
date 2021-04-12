import React from 'react';
import { Modal, Tabs, Button } from 'antd';
import { PlusCircleOutlined, DeliveredProcedureOutlined, DeleteOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import BaseInfo from './Modal/baseInfo';
import RoleMember from './Modal/roleMember';

const { TabPane } = Tabs;
const TabList = [
  {
    title: '基础信息',
    key: 'baseInfo'
  },
  {
    title: '授权信息',
    key: 'authoriza'
  },
  {
    title: '角色成员',
    key: 'roleMember'
  },
]

class UpdateModal extends React.Component {
  formRef = React.createRef();
  baseInfoRef = React.createRef();

  state = {
    tabKey: "baseInfo",
    updateModalVisible: false
  }

  componentDidMount() {
    this.setState({
      updateModalVisible: true
    })
  }

  add = () => {
    const { bindEvent } = this.props;
    this.formRef.current.setFieldsValue({
      branchNo: undefined,
      branchName: undefined
    });
    bindEvent('add');
  }

  submitForm = () => {
    const { bindEvent } = this.props;
    const { tabKey } = this.state;
    this.baseInfoRef.current.validateFields()
      .then(values => {
        bindEvent('save', tabKey, values)
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteEvent = () => {
    const { bindEvent, detail } = this.props;
    Modal.confirm({
      content: `确定定要删除部门信息【${detail.branchNo}】吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        bindEvent('delete')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 切换tab
  changeTab = (tab) => {
    this.setState({
      tabKey: tab
    })
  }

  render() {
    const { type = 'add', detail = {}, loadingSave = false, loadingDelete = false, bindEvent } = this.props;
    const { updateModalVisible, tabKey } = this.state;
    return (
      <Modal
        wrapClassName="custom-modal"
        width="80%"
        maskStyle={{ top: '94px', left: '100px' }}
        title={`角色信息【${type === 'add' ? '新增' : detail.code}】`}
        visible={updateModalVisible}
        onCancel={() => bindEvent('close')}
        maskClosable={false}
        getContainer={false}
        footer={(
          <>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={this.add}>新增</Button>
            <Button type="primary" icon={<DeliveredProcedureOutlined />} onClick={this.submitForm} loading={loadingSave}>保存</Button>
            <Button type="primary" icon={<DeleteOutlined />} disabled={type === 'add'} onClick={this.deleteEvent} loading={loadingDelete}>删除</Button>
            <Button type="primary" icon={<CloseCircleOutlined />} onClick={() => bindEvent('close')}>关闭</Button>
          </>
        )}
      >
        <Tabs activeKey={tabKey} type="card" size="small" onChange={this.changeTab}>
          {TabList.map(item => (
            <TabPane tab={item.title} key={item.key} disabled={type === 'add' && item.key !== 'baseInfo'}>
              {item.key === 'baseInfo' && <BaseInfo refs={this.baseInfoRef} detail={detail} type={type} />}
              {item.key === 'roleMember' && <RoleMember id={detail.id} />}
            </TabPane>
          ))}
        </Tabs>
      </Modal>
    )
  }
}

export default UpdateModal;