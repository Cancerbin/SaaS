import request from '@/utils/request';

// 获取角色列表
export async function queryCharacterList(params) {
  return request('/api/authority/role/page', {
    method: 'POST',
    data: params,
  });
}

// 获取角色成员列表
export async function queryRoleMemberList(params) {
  return request(`/api/authority/user/role/${params.id}`);
}


// 修改角色信息
export async function updateCharacterInfo(params) {
  return request('/api/authority/role', {
    method: 'PUT',
    data: params,
  });
}
