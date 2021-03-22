import { dynamic } from 'umi';

export default (props) => {
  const pathLen = props.path.split('/');
  let Comp;
  if (pathLen > 2) {
    url = `@/pages/${props.file}`;
  } else {
    Comp = dynamic({
      loader: () => import('@/pages/Navigation')
    })
  }
  console.log(Comp)
  return <Comp />;
};
