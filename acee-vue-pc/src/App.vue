<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script type="text/javascript">
import store from '@/store/index.js'
export default {
  name: 'app',
  created() {
    let user_info = JSON.parse(sessionStorage.getItem('user_info'));

    if (user_info && user_info.logined) {
      this.$router.push(`/${store.state.userInfo.province}/index`);
      // 还原数据
      store.setUserInfoAction(user_info);
    } else {
      this.$router.push('/signPage');
    }

    // 页面关闭之前
    window.onunload = function() {
      // 更新必要信息
      sessionStorage.setItem('user_info', JSON.stringify(store.state.userInfo));
    }

  }
}
</script>

<style>
html,
body {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  font-size: 16px;
  overflow: auto;
  background-color: #eceff1;
}

body::-webkit-scrollbar {
  display: none
}

* {
  margin: 0px;
  padding: 0px;
}

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

a {
  display: inline-block;
  color: #000;
  text-decoration: none
}

#app {
  box-sizing: border-box;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  position: relative;
}

@media screen and (max-width: 992px) {

  html,
  body {
    font-size: 15px;
  }
}

@media screen and (max-width: 768px) {

  html,
  body {
    font-size: 14px;
  }
}

@media screen and (max-width: 500px) {

  html,
  body {
    font-size: 13px;
  }
}

@media screen and (max-width: 400px) {

  html,
  body {
    font-size: 12px;
  }
}
</style>
