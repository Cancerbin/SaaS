import { stringify } from 'querystring';
import { history } from 'umi';
import { userLogin, queryVerifyCode, queryRouterMenu } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      if (response.code === 0) {
        const { data } = response;
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('account', data.account);

        // 请求路由菜单
        // const routerResponse = yield call(queryRouterMenu, {
        //   userId: data.userId
        // });
        history.replace('/');
      }
    },
    logout() {
      sessionStorage.removeItem('tabList');
      sessionStorage.removeItem('tabKey');
      sessionStorage.removeItem('sideMenuKey');
      history.replace({
        pathname: '/user/login'
      });
    },

    *queryRouterMenu({ payload }, { call, put }) {
      const response = yield call(queryRouterMenu, payload);
      return response;
    },

    *queryVerifyCode({ payload }, { call, put }) {
      const response = yield call(queryVerifyCode, payload);
      const image = URL.createObjectURL(response);
      return image;
    }
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
