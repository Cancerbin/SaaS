import request from '@/utils/request';

// 获取商品档案列表
export async function queryCommodityArchiveList(params) {
  return request('/api/saas/bdItemInfo/bizpage', {
    method: 'POST',
    data: params,
  });
}
