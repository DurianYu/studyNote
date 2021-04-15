<template>
  <div class="buy-ticket">
    <div class="main-box page-space-l-t">
      <p class="font2-b">接到了公司出差通知，已经给你购置从北京到成都的机票。</p>
      <img src="@/assets/images/insurance/u108.png" alt="" />
      <p>但查看天气预报后，你准备登陆泰安保险平台，购买飞机延误险。</p>
    </div>
    <Button class="btn-next-a" type="primary" size="large" :to="{ name: 'insurance-home' }">下一步</Button>
  </div>
</template>

<script>
import { Button } from 'view-design'
export default {
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
.buy-ticket {
  padding: 0 50px;
  p {
    margin: 20px 0;
  }
}
</style>
