import React from 'react';
import { Input } from 'antd';

class Category extends React.Component {
  componentDidMount() {
    console.log('update')
  }

  render() {
    return (
      <>
        <Input /> 123
      </>
    )
  }
}

export default Category;