import request from '@/utils/request';

// 获取部门列表
export async function queryDepartmentList(params) {
  return request('/api/authority/org/page', {
    method: 'POST',
    data: params,
  });
}

// 新增部门信息
export async function addMechanismInfo(params) {
  return request('/api/authority/org', {
    method: 'POST',
    data: params,
  });
}

// 修改部门信息
export async function updateMechanismInfo(params) {
  return request('/api/authority/org', {
    method: 'PUT',
    data: params,
  });
}

// 删除部门
export async function deleteMechanismInfo(params) {
  return request(`/api/authority/org?ids[]=${params.ids}`, {
    method: 'DELETE',
  });
}