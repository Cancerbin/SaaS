import {
  queryNotices
} from '@/services/user';
import { history } from 'umi';
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
    *deleteTabKey({ payload }, { put }) {
      yield put({
        type: 'saveDeleteTabKey',
        payload
      })
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
    },
    saveTabKey(state, { payload }) {
      sessionStorage.setItem('tabKey', payload.tab);
      return {
        ...state,
        tabKey: payload.tab
      }
    },
    saveDeleteTabKey(state, { payload }) {
      let tabKey;
      const tabList = [...state.tabList];
      const index = tabList.findIndex(item => item.path === payload.path);
      // 判断位置
      if (index === tabList.length - 1) {
        tabKey = tabList[index - 1].path;
      } else {
        tabKey = tabList[index + 1].path;
      }
      tabList.splice(index, 1);
      sessionStorage.setItem('tabList', JSON.stringify(tabList));
      sessionStorage.setItem('tabKey', tabKey);
      history.replace({
        pathname: tabKey
      })
      return {
        ...state,
        tabKey: tabKey,
        tabList: tabList
      }
    },
  },
};
export default GlobalModel;
