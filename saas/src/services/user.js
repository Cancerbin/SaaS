import request from '@/utils/request';

// 获取部门列表
export async function queryDepartmentList(params) {
  return request('/api/authority/org/page', {
    method: 'POST',
    data: params,
  });
}
