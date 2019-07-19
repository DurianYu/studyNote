import Vue from 'vue';
// import Vue from 'vue'
import Router from 'vue-router';

/* ********** 页面 ********** */
const index = () => import('../pages/index'); // 框架页面
const home = () => import('../pages/home'); // 首页
const search = () => import('../pages/search'); // 搜索页面
const play = () => import('../pages/play'); // 播放音乐的详细页面

/* ********** 组件 ********** */

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      props: true,
      children: [{
        path: '', // 默认首页
        name: 'home',
        component: home
      }, {
        path: 'search',
        name: 'search',
        component: search
      }]
    },
    {
      path: 'play',
      name: 'play',
      component: play,
      props: true,
      beforeEnter: (to, from, next) => {
        console.log('to,from,next', to, from, next);
        next();
      }
    }
  ]
});
