import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'view-design/dist/styles/iview.css'
import VueClipboard from 'vue-clipboard2'
import fetch from './fetch/fly'
import './router/guard'

Vue.config.productionTip = false
Vue.use(VueClipboard)

Vue.prototype.$fetch = fetch
Vue.prototype.$getEntityNewStatus = entityName => {
  if (JSON.stringify(store.state.teamStatus) === '{}') return {}
  return store.state.teamStatus[entityName]?.find(item => item.is_new === 1)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
