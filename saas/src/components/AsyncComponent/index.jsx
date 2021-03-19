import { dynamic } from 'umi';

export default (props) => {
  const Copm = dynamic({
    loader: () => import('@/pages/Welcome')
  })
  return <Copm/>;
};
