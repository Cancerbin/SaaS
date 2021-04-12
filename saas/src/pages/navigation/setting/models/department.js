import {
  queryDepartmentList,
  addMechanismInfo,
  updateMechanismInfo,
  deleteMechanismInfo
} from '@/services/mechanism';
export default {
  namespace: 'department',
  state: {},
  effects: {
    *queryDepartmentList({ payload }, { call, put }) {
      const response = yield call(queryDepartmentList, payload);
      return response;
    },
    *addMechanismInfo({ payload }, { call, put }) {
      const response = yield call(addMechanismInfo, payload);
      return response;
    },
    *updateMechanismInfo({ payload }, { call, put }) {
      const response = yield call(updateMechanismInfo, payload);
      return response;
    },
    *deleteMechanismInfo({ payload }, { call, put }) {
      const response = yield call(deleteMechanismInfo, payload);
      return response;
    },
  },
  reducers: {
   
  },
};