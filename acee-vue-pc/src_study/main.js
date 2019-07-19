// 入口文件
import Vue from 'vue';
// 注册v-charts的组件
import '@/plugins/v-charts/index.js';
// 注册element-ui的组件
import '@/plugins/element-ui/index.js';
// 引入路由
import router from './router';
// 导入vuex的管理仓库
import store from '@/store/index.js';
import App from './App';
import '@/common/css/global.scss';
import { mapState } from 'vuex';
Vue.prototype.mapState = mapState;
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  console.log('to', to);
  console.log('from', from);
  next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
});
