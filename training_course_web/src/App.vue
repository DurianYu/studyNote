<template>
  <div id="app">
    <div class="header">
      <img src="@/assets/images/logo.png" alt="" />
    </div>
    <div class="content">
      <router-view />
    </div>
    <Browser :visible="false" />
  </div>
</template>
<script>
import Browser from './components/browser/Index'
export default {
  components: {
    Browser
  },
  data() {
    return {
      visible: false
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/reset.scss';
@import '@/assets/css/index.scss';
#app {
  .header {
    height: 59px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 7px 17px 0px rgba(44, 45, 51, 0.2);
    background: rgba(72, 72, 72, 1);
    box-shadow: 0px 7px 17px 0px rgba(44, 45, 51, 0.2);
    img {
      height: 24px;
    }
  }
  .content {
    height: calc(100vh - 59px);
  }
}
</style>
