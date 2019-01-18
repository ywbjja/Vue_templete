import { constantRouterMap } from '@/router'
import Layout from '@/views/layout/Layout'
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
        commit('SET_ROUTERS', data)
        resolve()
      })
    }
  }
}

export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
  const backAsyncRouter = routers.filter(router => {
    if (router.component) {
      // Layout布局特殊处理
      if (router.component === 'Layout') {
        router.component = Layout
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length > 0) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
  return backAsyncRouter
}

export const loadView = (view) => { // 路由懒加载
  return () => import(`@/views/${view}`)
}

export default permission
