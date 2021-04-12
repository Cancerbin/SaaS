import React from 'react';
import { Form, Input } from 'antd';

class BaseInfo extends React.Component {
  render() {
    const { detail, refs, type = 'add' } = this.props;
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    return (
      <Form
        name="basic"
        ref={refs}
        initialValues={{
          code: detail.code,
          name: detail.name,
          describe: detail.describe
        }}
        {...layout}
      >
        <Form.Item
          label="角色编码"
          name="code"
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
          label="角色名称"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your 部门名称!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="备注"
          name="describe"
        >
          <Input />
        </Form.Item>
      </Form>
    )
  }
}
export default BaseInfo;