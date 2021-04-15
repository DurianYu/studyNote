import router from './index'
import store from '../store/index'
import { routerMsg } from './config'
import { Message } from 'view-design'

router.beforeEach((to, from, next) => {
  // 如果没有角色分配就代表不需要限制，直接进入
  if (!to.meta.role) {
    next()
    return
  }
  // 如果当前角色没有访问权限就不跳转
  if (!to.meta.role.includes(store.getters.currentRole)) {
    next({ name: 'invoices-home' })
    return
  }
  const currentStatus = store.getters.currentStatus || '' // 当前角色的最新状态
  const status = to.meta.accessStatus?.includes(currentStatus)
  if (status || !currentStatus) {
    next()
    return
  } else {
    // 判断如果是刷新进入，这样就获取不到上一个页面，所以就统一返回到首页
    if (from.name) {
      return
    }
    Message.warning(routerMsg)
    next({ name: 'invoices-home' })
    return
  }
})
