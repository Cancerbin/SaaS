import {
  queryCharacterList,
  queryRoleMemberList,
  updateCharacterInfo,
  addCharacterInfo,
  deleteCharacterInfo,
  queryCharacterAuthoriza
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
    *addCharacterInfo({ payload }, { call, put }) {
      const response = yield call(addCharacterInfo, payload);
      return response;
    },
    *deleteCharacterInfo({ payload }, { call, put }) {
      const response = yield call(deleteCharacterInfo, payload);
      return response;
    },
    *queryCharacterAuthoriza({ payload }, { call, put }) {
      const response = yield call(queryCharacterAuthoriza, payload);
      return response;
    },
  },
  reducers: {
   
  },
};