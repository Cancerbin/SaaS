import { dynamic } from 'umi';

export default (props) => {
  let Comp;
  if (props.component) {
    Comp = dynamic({
      loader: () => import(`@/pages/${props.component}/index.jsx`)
    })
  }
  return <Comp />;
};
