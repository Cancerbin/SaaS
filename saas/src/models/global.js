import {
  queryNotices
} from '@/services/user';
const GlobalModel = {
  namespace: 'global',
  state: {
    sideMenuKey: null,
    tabList: [],
  },
  effects: {
    *updateSideMenu({ payload }, { put }) {
      yield put({
        type: 'saveSideMenu',
        payload,
      });
    },
    *updateTabList({ payload }, { put }) {
      yield put({
        type: 'saveTabList',
        payload,
      });
    }
  },
  reducers: {
    saveSideMenu(state, { payload }) {
      sessionStorage.setItem('sideMenuKey', payload.menu);
      return {
        ...state,
        sideMenuKey: payload.menu
      }
    },
    saveTabList(state, { payload }) {
      sessionStorage.setItem('tabList', JSON.stringify(payload.tabList));
      return {
        ...state,
        tabList: payload.tabList
      }
    }
  },
};
export default GlobalModel;
