// store/permission.js
import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 *
 * @param  {Array} userRouter 后台接口请求的路由
 * @param  {Array} allRouter  配置的路由的
 * @return {Array} userRealRouters 过滤后的路由
 */

export function userCurrentRouter(userRouter = [], allRouter = []) {
  var userRealRouters = []
  allRouter.forEach((router, index) => {
    userRouter.forEach((item, index) => {
      // 拿用户的路由和配置路由进行匹配判断
      if (item.per_resource === router.meta.resources) {
        // 对路由下的子路由进行判断，递归添加
        if (item.children && item.children.length > 0) {
          router.children = userCurrentRouter(item.children, router.children)
        }
        // 这里是设置侧边栏的显示title还可以显示图标(没做)
        router.meta.title = item.per_name
        userRealRouters.push(router)
      }
    })
  })
  return userRealRouters
}
const permission = {
  state: {
    routers: constantRouterMap,
    apiRouters: [] // 后台接口获取得到的路由(per_resource)
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.apiRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', userCurrentRouter(data, asyncRouterMap))
        resolve()
      })
    }
  }
}

export default permission
