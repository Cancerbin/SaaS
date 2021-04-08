import React from 'react';
import { dynamic } from 'umi';

class AsyncComponent extends React.Component {
  state = {
    Comp: null
  };

  componentDidMount() {
    let Comp;
    const { path } = this.props;
    const pathArray = path.slice(1, path.length).split('/');
    if (pathArray.length === 1) {
      Comp = dynamic({
        loader: () => import(`@/pages/NavigationHome/index.jsx`)
      })
    } else {
      let pathUrl;
      pathArray.shift();
      pathUrl = pathArray.join('/');
      Comp = dynamic({
        loader: () => import(`@/pages/${pathUrl}/index.jsx`)
      })
    }
    this.setState({
      Comp
    })
  }

  render() {
    const { Comp } = this.state;
    return (
      <>{Comp && <Comp />}</>
    )
  }
}

export default AsyncComponent;