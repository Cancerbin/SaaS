import {
  queryCharacterList,
  queryRoleMemberList,
  updateCharacterInfo
} from '@/services/character';
export default {
  namespace: 'character',
  state: {},
  effects: {
    *queryCharacterList({ payload }, { call, put }) {
      const response = yield call(queryCharacterList, payload);
      return response;
    },
    *queryRoleMemberList({ payload }, { call, put }) {
      const response = yield call(queryRoleMemberList, payload);
      return response;
    },
    *updateCharacterInfo({ payload }, { call, put }) {
      const response = yield call(updateCharacterInfo, payload);
      return response;
    },
  },
  reducers: {
   
  },
};