import request from '@/utils/request'

// 获取所有的菜单树
export function getMenusTree() {
  return request({
    url: '/getAllMenuTree',
    method: 'get'
  })
}

export function getMenusTableTree() {
  return request({
    url: 'menus',
    method: 'get'
  })
}

export function buildMenus() {
  return request({
    url: 'api/menus/build',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/menus',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/menus/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'menus',
    method: 'put',
    data
  })
}

export function save(data) {
  return request({
    url: 'perms',
    method: 'put',
    data
  })
}

