import {
  queryNotices
} from '@/services/user';
const GlobalModel = {
  namespace: 'global',
  state: {
    sideMenuKey: null,
    tabList: [],
    tabKey: null
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
    },
    *updateTabKey({ payload }, { put }) {
      yield put({
        type: 'saveTabKey',
        payload,
      });
    },
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
    },
    saveTabKey(state, { payload }) {
      sessionStorage.setItem('tabKey', JSON.stringify(payload.tab));
      return {
        ...state,
        tabKey: payload.tab
      }
    }
  },
};
export default GlobalModel;
