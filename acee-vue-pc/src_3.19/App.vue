<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'app',
  created() {
    this.$router.push({name: 'mgrPeople'});
  }
}
</script>

<style>
html, body {
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
*, *:after, *:before {
-webkit-box-sizing:border-box;
   -moz-box-sizing:border-box;
        box-sizing:border-box;
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
  html, body {
    font-size: 15px;
  }
}
@media screen and (max-width: 768px) {
  html, body {
    font-size: 14px;
  }
}
@media screen and (max-width: 500px) {
  html, body {
    font-size: 13px;
  }
}
@media screen and (max-width: 400px) {
  html, body {
    font-size: 12px;
  }
}
</style>
