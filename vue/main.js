import Vue from 'vue'
import App from './app'
import router from './router'

router.push('component')

new Vue({
  router,
  components: {app},
  template: '</app>'
}).$mount('#app');
