import React, { useState } from 'react';
import { Form, Input } from 'antd';
import UniversalForm from '@/components/UniversalForm';

class BaseInfo extends React.Component {
  render() {
    const { detail, refs, type = 'add' } = this.props;
    const layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 8 },
    };
    const FormList = [
      {
        label: '角色编码',
        name: 'code',
        type: 'input',
        col: 24,
        disabled: type === 'update',
        rules: [
          {
            required: true,
            message: 'Please input your 部门编码!',
          },
        ]
      },
      {
        label: '角色名称',
        name: 'name',
        type: 'input',
        col: 24,
        rules: [
          {
            required: true,
            message: 'Please input your 部门名称!',
          },
        ]
      },
      {
        label: '备注',
        name: 'describe',
        type: 'input',
        col: 24,
      }
    ]
    return (
      <div className="custom-card">
        <div className="custom-card-orientation"><a>基本信息</a></div>
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
          <UniversalForm formList={FormList} />
        </Form>
      </div>
    )
  }
}
export default BaseInfo;