import React from 'react';
import { Row, Col, Form, Input } from 'antd';

class UniversalForm extends React.Component {
  render() {
    const {
      formList = []
    } = this.props;
    console.log(formList)
    return (
      <Row>
        {formList.map(item => (
          <Col span={8} key={item.name}>
            <Form.Item
              name={item.name}
              label={item.label}
            >
              <Input />
            </Form.Item>
          </Col>
        ))}
      </Row>
    )
  }
}

export default UniversalForm;