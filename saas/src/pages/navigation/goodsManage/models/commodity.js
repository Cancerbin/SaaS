import {
  queryCommodityArchiveList
} from '@/services/commodity';
export default {
  namespace: 'commodity',
  state: {},
  effects: {
    *queryCommodityArchiveList({ payload }, { call, put }) {
      const response = yield call(queryCommodityArchiveList, payload);
      return response;
    },
  },
  reducers: {
   
  },
};