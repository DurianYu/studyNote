<template>
  <div class="platform-home">
    <p>平台首页</p>
    <br />
    <Button type="primary" class="center" size="large">进入实训</Button>
  </div>
</template>

<script>
import { Button } from 'view-design'
export default {
  components: {
    Button
  },
  created() {
    debugger
  }
}
</script>

<style lang="scss" scoped>
.platform-home {
  padding: 100px;
  text-align: center;
}
</style>
