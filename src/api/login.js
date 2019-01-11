import request from '@/utils/request'
/**
 * 登录操作
 * @param {用户名} username
 * @param {密码} password
 */
export function login(username, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
/**
 * 获取用户信息
 * @param {token} token
 */
export function getInfo(token) {
  return request({
    url: '/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'user/logout',
    method: 'post'
  })
}
