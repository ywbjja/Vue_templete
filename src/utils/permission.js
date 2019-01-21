import store from '@/store'

export default function hasPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionList = value

    const isPermission = roles.some(role => {
      return permissionList.includes(role.rolename)
    })
    if (!isPermission) {
      return false
    }
    return true
  } else {
    this.$message({
      message: '需要角色权限列表',
      type: 'error'
    })
    return false
  }
}
