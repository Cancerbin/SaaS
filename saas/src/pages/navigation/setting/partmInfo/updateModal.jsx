import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { PlusCircleOutlined, DeliveredProcedureOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';

class UpdateModal extends React.Component {
  formRef = React.createRef();

  state = {
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
    this.formRef.current.validateFields()
      .then(values => {
        bindEvent('save', values)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { type = 'add', detail = {}, loadingSave = false, loadingDelete = false, bindEvent } = this.props;
    const { updateModalVisible } = this.state;
    return (
      <Modal
        wrapClassName="custom-modal"
        maskStyle={{ top: '94px', left: '100px' }}
        title={`部门信息【${type === 'add' ? '新增' : detail.id}】`}
        visible={updateModalVisible}
        onCancel={() => bindEvent('close')}
        maskClosable={false}
        getContainer={false}
        footer={(
          <>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={this.add}>新增</Button>
            <Button type="primary" icon={<DeliveredProcedureOutlined />} onClick={this.submitForm} loading={loadingSave}>保存</Button>
            <Button type="primary" icon={<DeleteOutlined />} disabled={type === 'add'} onClick={() => bindEvent('delete')} loading={loadingDelete}>删除</Button>
            <Button type="primary" icon={<CloseCircleOutlined />} onClick={() => bindEvent('close')}>关闭</Button>
          </>
        )}
      >

        <Form
          name="basic"
          ref={this.formRef}
          initialValues={{
            branchNo: detail.branchNo,
            branchName: detail.branchName
          }}
        >
          <Form.Item
            label="部门编码"
            name="branchNo"
            rules={[
              {
                required: true,
                message: 'Please input your 部门编码!',
              },
            ]}
          >
            <Input disabled={type === 'update'} />
          </Form.Item>
          <Form.Item
            label="部门名称"
            name="branchName"
            rules={[
              {
                required: true,
                message: 'Please input your 部门名称!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default UpdateModal;