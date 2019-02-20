import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
import component from '../components/component'
import Hello from '..components/HelloWorld'
export default new Router ({
  routes: [
    {
      path: '/component',
      component: component
    }, {
      path: '/hello',
      component: hello
    }
  ]
});
