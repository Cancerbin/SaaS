import { dynamic } from 'umi';

// 动态加载组件
export default (props) => {
  let Comp;
  const nameArray = props.name.split('.');
  const pathArray = nameArray.map(item => item.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()));
  const pathUrl = pathArray.join('/');
  if (nameArray.length === 1) {
    Comp = dynamic({
      loader: () => import(`@/pages/Navigation/index.jsx`)
    })
  } else {
    Comp = dynamic({
      loader: () => import(`@/pages/${pathUrl}/index.jsx`)
    })
  }
  return <Comp />;
};
