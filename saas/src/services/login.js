import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

// 用户登录
export async function userLogin(params) {
  return request('/api/oauth/noToken/login', {
    method: 'POST',
    data: params,
  });
}

// 获取登录验证码
export async function queryVerifyCode(params) {
  return request(`/api/oauth/anno/captcha?key=${params.key}`);
}

// 获取菜单栏
export async function queryRouterMenu(params) {
  return request(`/api/oauth/menu/router?userId=${params.userId}`);
}
