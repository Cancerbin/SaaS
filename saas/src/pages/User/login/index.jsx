import React from 'react';
import { connect } from 'umi';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, BankOutlined, LockOutlined, CodeOutlined } from '@ant-design/icons';
import styles from './index.less';

class Login extends React.Component {
  state = {
    verifyCode: null,
    verifyKey: null
  }

  componentDidMount() {
    this.queryVerifyCode();
  }

  // 获取验证码
  queryVerifyCode = () => {
    const { dispatch } = this.props;
    const arr = [];
    const hexDigits = "0123456789abcdef";
    let verifyKey;
    for (let i = 0; i < 36; i++) { arr[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1); }
    arr[14] = "4";
    arr[19] = hexDigits.substr((arr[19] & 0x3) | 0x8, 1);
    arr[8] = arr[13] = arr[18] = arr[23] = "-";
    verifyKey = arr.join('');
    dispatch({
      type: "login/queryVerifyCode",
      payload: {
        key: verifyKey
      }
    }).then(res => {
      this.setState({
        verifyKey: verifyKey,
        verifyCode: res
      })
    })
  }

  // 提交登录
  submitLogin = (values) => {
    const { dispatch } = this.props;
    const { verifyKey } = this.state;
    const tenantValue = window.btoa(encodeURIComponent(values.organization));
    sessionStorage.setItem("tenant", tenantValue);
    dispatch({
      type: "login/login",
      payload: {
        account: values.username,
        password: values.password,
        key: verifyKey,
        code: values.verify,
        grantType: 'captcha',
        tenant: tenantValue
      }
    })
  }

  render() {
    const { verifyCode } = this.state;
    return (
      <div className={styles.loginLayout}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Form
              name="basic"
              size="large"
              initialValues={{
                organization: '0000',
                username: '1001',
                password: '1001',
                remember: true
              }}
              onFinish={this.submitLogin}
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
              <Form.Item
                name="verify"
                rules={[{ required: true, message: 'Please input your verify!' }]}
              >
                <Input
                  prefix={<CodeOutlined className={styles.icon} />}
                  addonAfter={<img className={styles.image} src={verifyCode} onClick={this.queryVerifyCode} />}
                  placeholder="验证码"
                />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" block htmlType="submit">登 录</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ login }) => ({}))(Login);