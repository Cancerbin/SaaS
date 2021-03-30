import { dynamic } from 'umi';

// 动态加载组件
export default (props) => {
  let Comp;
  const pathArray = props.path.slice(1, props.path.length).split('/');
  // const pathArray = nameArray.map(item => item.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()));
  // const pathUrl = pathArray.join('/');
  if (pathArray.length === 1) {
    Comp = dynamic({
      loader: () => import(`@/pages/Navigation/index.jsx`)
    })
  } else {
    let pathUrl = "/xxx";
    Comp = dynamic({
      loader: () => import(`@/pages/${pathUrl}/index.jsx`)
    })
  }
  return <Comp />;
};
