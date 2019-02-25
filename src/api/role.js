import request from '@/utils/request'

// 获取所有的Role
export function getRoleTree() {
  return request({
    url: '/getAllRoleList',
    method: 'post'
  })
}

// 获取具有当前菜单权限的的Role
export function getUserRoles(data) {
  return request({
    url: '/getRoleListByPerId',
    method: 'post',
    data
  })
}
// 获取具有当前菜单权限的的Role
export function getPerIdList(data) {
  return request({
    url: '/getPerIdList',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/roles',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: '/roles/' + id,
    method: 'delete'
  })
}
