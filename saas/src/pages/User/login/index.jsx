import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, BankOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.less';

class Login extends React.Component {
  render() {
    return (
      <div className={styles.loginLayout}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Form
              name="basic"
              size="large"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="organization"
                rules={[{ required: true, message: 'Please input your organization!' }]}
              >
                <Input prefix={<BankOutlined className={styles.icon} />} placeholder="机构号" />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input prefix={<UserOutlined className={styles.icon} />} placeholder="用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input prefix={<LockOutlined className={styles.icon} />} type="password" placeholder="密码" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" block>登 录</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;