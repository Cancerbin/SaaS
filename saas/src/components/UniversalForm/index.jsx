import React from 'react';
import { Row, Col, Form, Input } from 'antd';

class UniversalForm extends React.Component {
  render() {
    const {
      formList = []
    } = this.props;
    return (
      <Row>
        {formList.map(item => (
          <Col span={item.col || 8} key={item.name}>
            <Form.Item
              name={item.name}
              label={item.label}
              rules={item.rules || null}
            >
              <Input disabled={item.disabled} />
            </Form.Item>
          </Col>
        ))}
      </Row>
    )
  }
}

export default UniversalForm;