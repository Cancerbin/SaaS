import { dynamic } from 'umi';

// 动态加载组件
export default (props) => {
  let Comp;
  const pathArray = props.path.slice(1, props.path.length).split('/');
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
  return <Comp />;
};
